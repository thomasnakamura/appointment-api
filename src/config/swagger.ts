export const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Appointment API',
    version: '1.0.0',
    description: 'API de Agendamento para o Desafio Clínica Seven',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      CreateAppointment: {
        type: 'object',
        properties: {
          specialistId: { type: 'string', format: 'uuid' },
          date: { type: 'string', example: '2025-06-01' },
          time: { type: 'string', example: '14:00' }
        },
        required: ['specialistId', 'date', 'time']
      },
      UpdateAppointmentStatus: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['pending', 'confirmed', 'cancelled', 'completed', 'rescheduled', 'expired']
          }
        },
        required: ['status']
      },
      RegisterUser: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          role: { type: 'string', enum: ['client', 'specialist', 'admin'] }
        },
        required: ['name', 'email', 'password', 'role']
      },
      LoginUser: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['email', 'password']
      },
      CreateClient: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          phone: { type: 'string' },
          cpf: { type: 'string' }
        },
        required: ['userId', 'phone', 'cpf']
      },
      CreateSpecialist: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          specialty: { type: 'string' },
          dailyLimit: { type: 'integer' },
          minIntervalMinutes: { type: 'integer' },
          availability: {
            type: 'object',
            additionalProperties: {
              type: 'array',
              items: { type: 'string', example: '09:00' }
            },
            example: {
              monday: ['08:00', '10:00', '14:00'],
              tuesday: ['09:00', '13:00'],
              wednesday: [],
              thursday: ['15:00'],
              friday: ['09:00', '11:00', '14:00', '18:00'],
              saturday: [],
              sunday: ['14:00', '18:00']
            },
            description: 'Disponibilidade por dia da semana, com lista de horários'
          }
        },
        required: ['userId', 'specialty', 'dailyLimit', 'minIntervalMinutes', 'availability']
      },
      UpdateAvailability: {
        type: 'object',
        properties: {
          availability: {
            type: 'object',
            additionalProperties: {
              type: 'array',
              items: { type: 'string', example: '09:00' }
            },
            example: {
              monday: ['08:00', '10:00', '14:00'],
              tuesday: ['09:00', '13:00'],
              wednesday: [],
              thursday: ['15:00'],
              friday: ['09:00', '11:00', '14:00', '18:00'],
              saturday: [],
              sunday: ['14:00', '18:00']
            },
            description: 'Disponibilidade por dia da semana, com lista de horários disponíveis'
          }
        },
        required: ['availability']
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/auth/register': {
      post: {
        summary: 'Cadastro de usuário',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterUser' } } }
        },
        responses: { 201: { description: 'Usuário criado com sucesso' } }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Login de usuário',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginUser' } } }
        },
        responses: { 200: { description: 'Token JWT retornado' } }
      }
    },
    '/clients': {
      post: {
        summary: 'Criar cliente',
        tags: ['Clients'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateClient' } } }
        },
        responses: { 201: { description: 'Cliente criado com sucesso' } }
      }
    },
    '/clients/{id}': {
      get: {
        summary: 'Buscar cliente por ID',
        tags: ['Clients'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Cliente encontrado' } }
      },
      put: {
        summary: 'Atualizar cliente',
        tags: ['Clients'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateClient' } } }
        },
        responses: { 200: { description: 'Cliente atualizado com sucesso' } }
      },
      delete: {
        summary: 'Deletar cliente',
        tags: ['Clients'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 204: { description: 'Cliente deletado com sucesso' } }
      }
    },
    '/specialists': {
      post: {
        summary: 'Criar especialista',
        tags: ['Specialists'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateSpecialist' } } }
        },
        responses: { 201: { description: 'Especialista criado com sucesso' } }
      }
    },
    '/specialists/available': {
      get: {
        summary: 'Consultar horários disponíveis',
        tags: ['Specialists'],
        parameters: [
          { name: 'specialty', in: 'query', required: true, schema: { type: 'string' } },
          { name: 'date', in: 'query', required: true, schema: { type: 'string', format: 'date' } }
        ],
        responses: { 200: { description: 'Lista de especialistas e horários disponíveis' } }
      }
    },
    '/specialists/{id}/availability': {
      put: {
        summary: 'Atualizar disponibilidade do especialista',
        tags: ['Specialists'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateAvailability' } } }
        },
        responses: { 200: { description: 'Disponibilidade atualizada com sucesso' } }
      }
    },
    '/appointments': {
      post: {
        summary: 'Criar agendamento',
        tags: ['Appointments'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateAppointment' } } }
        },
        responses: { 201: { description: 'Agendamento criado com sucesso' } }
      },
      get: {
        summary: 'Listar agendamentos do cliente',
        tags: ['Appointments'],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'Lista de agendamentos' } }
      }
    },
    '/appointments/{id}/status': {
      patch: {
        summary: 'Atualizar status do agendamento',
        tags: ['Appointments'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateAppointmentStatus' } } }
        },
        responses: { 200: { description: 'Status atualizado com sucesso' } }
      }
    },
    '/appointments/{id}': {
      delete: {
        summary: 'Cancelar agendamento',
        tags: ['Appointments'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 204: { description: 'Agendamento cancelado com sucesso' } }
      }
    }
  }
};
