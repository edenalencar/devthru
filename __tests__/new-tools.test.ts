import { describe, it, expect } from "vitest"
import { decodeSefazKey, calculateSefazDv } from "@/lib/utils/validators/sefaz-key"
import { parseCurl, generateFetchCode, generatePythonCode } from "@/lib/utils/curl-parser"

describe("SEFAZ Key Parser & Validator", () => {
    it("should correctly decode a 44-digit NF-e key", () => {
        const sampleKey = "35260812345678000195550010000001231000012345"
        const decoded = decodeSefazKey(sampleKey)

        expect(decoded).not.toBeNull()
        expect(decoded?.uf.code).toBe("35")
        expect(decoded?.uf.state).toBe("SP")
        expect(decoded?.model.code).toBe("55")
        expect(decoded?.model.name).toBe("NF-e")
        expect(decoded?.series).toBe("1")
        expect(decoded?.number.raw).toBe("000000123")
        expect(decoded?.cnpj.raw).toBe("12345678000195")
        expect(decoded?.calculatedDv).toBe(5)
        expect(decoded?.isValidDv).toBe(true)
    })

    it("should calculate correct Módulo 11 check digit for sample keys", () => {
        const k1 = "3526081234567800019555001000000123100001234"
        expect(calculateSefazDv(k1)).toBe(5)

        const k2 = "3326089876543200019965002000005432900005678"
        expect(calculateSefazDv(k2)).toBe(2)

        const k3 = "4126081122334400015557001000000987100009876"
        expect(calculateSefazDv(k3)).toBe(4)

        const k4 = "3126085544332200018858001000000456100004567"
        expect(calculateSefazDv(k4)).toBe(7)
    })
})

describe("cURL Parser & Code Generator", () => {
    it("should parse method, headers, and body from cURL command", () => {
        const cmd = `curl -X POST https://api.devthru.com/v1/test -H "Content-Type: application/json" -H "Authorization: Bearer mytoken" -d '{"hello":"world"}'`
        const parsed = parseCurl(cmd)

        expect(parsed.method).toBe("POST")
        expect(parsed.url).toBe("https://api.devthru.com/v1/test")
        expect(parsed.headers["Content-Type"]).toBe("application/json")
        expect(parsed.headers["Authorization"]).toBe("Bearer mytoken")
        expect(parsed.body).toBe('{"hello":"world"}')
    })

    it("should generate valid Fetch code", () => {
        const cmd = `curl -X GET https://api.devthru.com/v1/data`
        const parsed = parseCurl(cmd)
        const fetchCode = generateFetchCode(parsed)

        expect(fetchCode).toContain("fetch('https://api.devthru.com/v1/data')")
    })

    it("should generate valid Python Requests code", () => {
        const cmd = `curl -X POST https://api.devthru.com/v1/data -d '{"test":1}'`
        const parsed = parseCurl(cmd)
        const pythonCode = generatePythonCode(parsed)

        expect(pythonCode).toContain("import requests")
        expect(pythonCode).toContain("requests.post('https://api.devthru.com/v1/data'")
    })
})
