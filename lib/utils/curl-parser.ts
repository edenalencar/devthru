export interface ParsedCurl {
    url: string
    method: string
    headers: Record<string, string>
    body?: string
    auth?: {
        user: string
        pass?: string
    }
}

export function parseCurl(curlCommand: string): ParsedCurl {
    const cleanCmd = curlCommand
        .replace(/\\\r?\n/g, ' ')
        .replace(/[\r\n]+/g, ' ')
        .trim()

    // Tokenização respeitando aspas simples e duplas
    const tokens: string[] = []
    let currentToken = ""
    let inSingleQuote = false
    let inDoubleQuote = false
    let isEscaped = false

    for (let i = 0; i < cleanCmd.length; i++) {
        const char = cleanCmd[i]

        if (isEscaped) {
            currentToken += char
            isEscaped = false
            continue
        }

        if (char === '\\' && !inSingleQuote) {
            isEscaped = true
            continue
        }

        if (char === "'" && !inDoubleQuote) {
            inSingleQuote = !inSingleQuote
            continue
        }

        if (char === '"' && !inSingleQuote) {
            inDoubleQuote = !inDoubleQuote
            continue
        }

        if (char === ' ' && !inSingleQuote && !inDoubleQuote) {
            if (currentToken.length > 0) {
                tokens.push(currentToken)
                currentToken = ""
            }
            continue
        }

        currentToken += char
    }

    if (currentToken.length > 0) {
        tokens.push(currentToken)
    }

    let url = ""
    let method = "GET"
    const headers: Record<string, string> = {}
    let body: string | undefined = undefined
    let auth: { user: string; pass?: string } | undefined = undefined

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        const next = tokens[i + 1]

        if (token === "curl") continue

        if (token === "-X" || token === "--request") {
            if (next) {
                method = next.toUpperCase()
                i++
            }
        } else if (token === "-H" || token === "--header") {
            if (next) {
                const colonIdx = next.indexOf(":")
                if (colonIdx > 0) {
                    const key = next.substring(0, colonIdx).trim()
                    const val = next.substring(colonIdx + 1).trim()
                    headers[key] = val
                }
                i++
            }
        } else if (token === "-d" || token === "--data" || token === "--data-raw" || token === "--data-binary" || token === "--data-urlencode") {
            if (next !== undefined) {
                body = body ? body + "&" + next : next
                if (method === "GET") method = "POST"
                i++
            }
        } else if (token === "-u" || token === "--user") {
            if (next) {
                const [user, pass] = next.split(":")
                auth = { user, pass }
                i++
            }
        } else if (token === "-A" || token === "--user-agent") {
            if (next) {
                headers["User-Agent"] = next
                i++
            }
        } else if (token === "--url") {
            if (next) {
                url = next
                i++
            }
        } else if (token.startsWith("http://") || token.startsWith("https://") || (!url && !token.startsWith("-"))) {
            url = token
        }
    }

    if (!url) {
        url = "https://api.exemplo.com/v1/recurso"
    }

    return {
        url,
        method,
        headers,
        body,
        auth,
    }
}

export function generateFetchCode(parsed: ParsedCurl): string {
    const hasHeaders = Object.keys(parsed.headers).length > 0 || parsed.auth
    const headersObj: Record<string, string> = { ...parsed.headers }

    if (parsed.auth) {
        const creds = `${parsed.auth.user}:${parsed.auth.pass || ""}`
        headersObj["Authorization"] = `Basic btoa("${creds}")`
    }

    let isJson = false
    let bodyFormatted = ""

    if (parsed.body) {
        try {
            JSON.parse(parsed.body)
            isJson = true
            bodyFormatted = JSON.stringify(JSON.parse(parsed.body), null, 2)
        } catch {
            isJson = false
            bodyFormatted = JSON.stringify(parsed.body)
        }
    }

    const options: string[] = []
    if (parsed.method !== "GET") {
        options.push(`  method: '${parsed.method}'`)
    }

    if (Object.keys(headersObj).length > 0) {
        const headersStr = JSON.stringify(headersObj, null, 2)
            .split("\n")
            .map((line, idx) => (idx === 0 ? line : "  " + line))
            .join("\n")
        options.push(`  headers: ${headersStr}`)
    }

    if (parsed.body) {
        if (isJson) {
            options.push(`  body: JSON.stringify(${bodyFormatted})`)
        } else {
            options.push(`  body: ${bodyFormatted}`)
        }
    }

    const optionsBlock = options.length > 0 ? `,\n{\n${options.join(",\n")}\n}` : ""

    return `async function makeRequest() {
  try {
    const response = await fetch('${parsed.url}'${optionsBlock});
    
    if (!response.ok) {
      throw new Error(\`Erro HTTP: \${response.status}\`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Falha na requisição:', error);
  }
}

makeRequest();`
}

export function generateAxiosCode(parsed: ParsedCurl): string {
    const headersObj: Record<string, string> = { ...parsed.headers }
    if (parsed.auth) {
        const creds = `${parsed.auth.user}:${parsed.auth.pass || ""}`
        headersObj["Authorization"] = `Basic btoa("${creds}")`
    }

    let bodyParsed: any = parsed.body
    if (parsed.body) {
        try {
            bodyParsed = JSON.parse(parsed.body)
        } catch {
            bodyParsed = parsed.body
        }
    }

    const config: string[] = []
    config.push(`  method: '${parsed.method.toLowerCase()}'`)
    config.push(`  url: '${parsed.url}'`)

    if (Object.keys(headersObj).length > 0) {
        config.push(`  headers: ${JSON.stringify(headersObj, null, 4)}`)
    }

    if (parsed.body) {
        config.push(`  data: ${typeof bodyParsed === "object" ? JSON.stringify(bodyParsed, null, 4) : JSON.stringify(bodyParsed)}`)
    }

    return `import axios from 'axios';

async function makeRequest() {
  try {
    const response = await axios({
${config.join(",\n")}
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição Axios:', error);
  }
}

makeRequest();`
}

export function generatePythonCode(parsed: ParsedCurl): string {
    const lines: string[] = ["import requests", ""]

    let isJson = false
    let dataVar = ""

    if (parsed.body) {
        try {
            const parsedJson = JSON.parse(parsed.body)
            isJson = true
            lines.push(`payload = ${JSON.stringify(parsedJson, null, 4)}`)
            dataVar = "json=payload"
        } catch {
            isJson = false
            lines.push(`payload = ${JSON.stringify(parsed.body)}`)
            dataVar = "data=payload"
        }
        lines.push("")
    }

    if (Object.keys(parsed.headers).length > 0) {
        lines.push(`headers = ${JSON.stringify(parsed.headers, null, 4)}`)
        lines.push("")
    }

    const args: string[] = [`'${parsed.url}'`]
    if (Object.keys(parsed.headers).length > 0) args.push("headers=headers")
    if (dataVar) args.push(dataVar)
    if (parsed.auth) {
        args.push(`auth=('${parsed.auth.user}', '${parsed.auth.pass || ""}')`)
    }

    const methodLower = parsed.method.toLowerCase()
    lines.push(`try:`)
    lines.push(`    response = requests.${methodLower}(${args.join(", ")})`)
    lines.push(`    response.raise_for_status()`)
    lines.push(`    print(response.json())`)
    lines.push(`except requests.exceptions.RequestException as e:`)
    lines.push(`    print(f"Erro na requisição: {e}")`)

    return lines.join("\n")
}

export function generateGoCode(parsed: ParsedCurl): string {
    const method = parsed.method
    const hasBody = !!parsed.body

    return `package main

import (
    "bytes"
    "fmt"
    "io"
    "net/http"
)

func main() {
    url := "${parsed.url}"
    ${hasBody ? `payload := bytes.NewBuffer([]byte(${JSON.stringify(parsed.body)}))` : `var payload io.Reader = nil`}

    req, err := http.NewRequest("${method}", url, ${hasBody ? "payload" : "nil"})
    if err != nil {
        panic(err)
    }

${Object.entries(parsed.headers).map(([k, v]) => `    req.Header.Set("${k}", "${v}")`).join("\n")}
${parsed.auth ? `    req.SetBasicAuth("${parsed.auth.user}", "${parsed.auth.pass || ""}")\n` : ""}
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        panic(err)
    }

    fmt.Println(string(body))
}`
}

export function generatePhpCode(parsed: ParsedCurl): string {
    return `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '${parsed.url}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => '${parsed.method}',
${parsed.body ? `  CURLOPT_POSTFIELDS => ${JSON.stringify(parsed.body)},\n` : ""}${Object.keys(parsed.headers).length > 0 ? `  CURLOPT_HTTPHEADER => array(\n${Object.entries(parsed.headers).map(([k, v]) => `    '${k}: ${v}'`).join(",\n")}\n  ),\n` : ""}${parsed.auth ? `  CURLOPT_USERPWD => '${parsed.auth.user}:${parsed.auth.pass || ""}',\n` : ""}));

$response = curl_exec($curl);

if (curl_errno($curl)) {
    echo 'Erro cURL: ' . curl_error($curl);
} else {
    echo $response;
}

curl_close($curl);
`
}
