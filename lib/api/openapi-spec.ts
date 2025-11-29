export const openApiSpec = {
    openapi: '3.0.0',
    info: {
        title: 'DevHub Tools API',
        version: '1.0.0',
        description: 'API REST para geração e validação de dados brasileiros',
        contact: {
            name: 'DevHub Tools',
            url: 'https://devhubtools.com',
        },
    },
    servers: [
        {
            url: 'https://devhubtools.com/api/v1',
            description: 'Production server',
        },
        {
            url: 'http://localhost:3000/api/v1',
            description: 'Development server',
        },
    ],
    security: [
        {
            ApiKeyAuth: [],
        },
    ],
    components: {
        securitySchemes: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-api-key',
                description: 'API key for authentication. Get yours at /settings/api-keys',
            },
        },
        schemas: {
            Error: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    error: {
                        type: 'object',
                        properties: {
                            code: {
                                type: 'string',
                                example: 'INVALID_API_KEY',
                            },
                            message: {
                                type: 'string',
                                example: 'Invalid or missing API key',
                            },
                            details: {
                                type: 'object',
                            },
                        },
                    },
                },
            },
            GenerateRequest: {
                type: 'object',
                properties: {
                    quantity: {
                        type: 'integer',
                        minimum: 1,
                        maximum: 100,
                        default: 1,
                        description: 'Number of items to generate (max 100)',
                    },
                    options: {
                        type: 'object',
                        description: 'Tool-specific options',
                        properties: {
                            formatted: {
                                type: 'boolean',
                                description: 'Return formatted output',
                            },
                        },
                    },
                },
            },
            GenerateResponse: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: true,
                    },
                    data: {
                        oneOf: [
                            { type: 'string' },
                            { type: 'array', items: { type: 'string' } },
                        ],
                    },
                    count: {
                        type: 'integer',
                        example: 1,
                    },
                },
            },
            ValidateRequest: {
                type: 'object',
                required: ['value'],
                properties: {
                    value: {
                        type: 'string',
                        description: 'Value to validate',
                        example: '123.456.789-00',
                    },
                },
            },
            ValidateResponse: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: true,
                    },
                    valid: {
                        type: 'boolean',
                        example: true,
                    },
                    value: {
                        type: 'string',
                        example: '123.456.789-00',
                    },
                },
            },
            UsageResponse: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: true,
                    },
                    period: {
                        type: 'string',
                        example: 'monthly',
                    },
                    used: {
                        type: 'integer',
                        example: 150,
                    },
                    limit: {
                        type: 'integer',
                        example: 1000,
                        description: '-1 for unlimited',
                    },
                    remaining: {
                        type: 'integer',
                        example: 850,
                    },
                    resetAt: {
                        type: 'string',
                        format: 'date-time',
                    },
                    topTools: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                tool: { type: 'string' },
                                count: { type: 'integer' },
                            },
                        },
                    },
                },
            },
        },
    },
    paths: {
        '/generate/{tool}': {
            post: {
                summary: 'Generate data',
                description: 'Generate Brazilian data for testing purposes',
                tags: ['Generation'],
                parameters: [
                    {
                        name: 'tool',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                            enum: ['cpf', 'cnpj', 'rg', 'cnh', 'inscricao-estadual', 'titulo-eleitor', 'pis', 'name', 'email', 'phone', 'address', 'person', 'uuid', 'password', 'lorem'],
                        },
                        description: 'Tool to use for generation',
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/GenerateRequest',
                            },
                            examples: {
                                single: {
                                    summary: 'Generate single CPF',
                                    value: {
                                        quantity: 1,
                                        options: { formatted: true },
                                    },
                                },
                                multiple: {
                                    summary: 'Generate 10 CPFs',
                                    value: {
                                        quantity: 10,
                                        options: { formatted: true },
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successful generation',
                        headers: {
                            'X-RateLimit-Limit': {
                                schema: { type: 'integer' },
                                description: 'Request limit per month',
                            },
                            'X-RateLimit-Remaining': {
                                schema: { type: 'integer' },
                                description: 'Remaining requests',
                            },
                            'X-RateLimit-Reset': {
                                schema: { type: 'string' },
                                description: 'Reset date (ISO 8601)',
                            },
                        },
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/GenerateResponse',
                                },
                            },
                        },
                    },
                    '401': {
                        description: 'Invalid API key',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '429': {
                        description: 'Rate limit exceeded',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/validate/{tool}': {
            post: {
                summary: 'Validate data',
                description: 'Validate Brazilian documents',
                tags: ['Validation'],
                parameters: [
                    {
                        name: 'tool',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                            enum: ['cpf', 'cnpj', 'inscricao-estadual', 'titulo-eleitor', 'pis'],
                        },
                        description: 'Document type to validate',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ValidateRequest',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Validation result',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ValidateResponse',
                                },
                            },
                        },
                    },
                    '401': {
                        description: 'Invalid API key',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/usage': {
            get: {
                summary: 'Get API usage statistics',
                description: 'Get your current API usage and limits',
                tags: ['Usage'],
                responses: {
                    '200': {
                        description: 'Usage statistics',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UsageResponse',
                                },
                            },
                        },
                    },
                    '401': {
                        description: 'Invalid API key',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    tags: [
        {
            name: 'Generation',
            description: 'Generate Brazilian data for testing',
        },
        {
            name: 'Validation',
            description: 'Validate Brazilian documents',
        },
        {
            name: 'Usage',
            description: 'API usage statistics',
        },
    ],
}
