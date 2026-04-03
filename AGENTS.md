# AVA — Dra. Ana Teniente (KWIQ / Calling)

Este es un proyecto de KWIQ bajo Calling. La plataforma se describe en #kwiq-general. Aqui operas SOLO dentro del contexto de este cliente.

---

## Brain

Consultorio de endocrinologia con modalidad online (telemedicina via Zoom) y presencial. Especializada en tratamientos hormonales, incluyendo seguimiento de pacientes GLP-1 (semaglutida, tirzepatida). Operada por la Dra. Ana Teniente con apoyo de Rosy (recepcionista) y Melina (asistente).

**Vertical:** Healthcare — Endocrinologia / Telemedicine.

### Valor que KWIQ Aporta

1. **WhatsApp AI + agendamiento:** Asistente que agenda citas, confirma pagos y envia links de Zoom. Presencial y telemedicina.
2. **Zoom integration:** Links de Zoom para consultas online. Link solo se entrega despues del pago.
3. **Custom forms:** Formularios personalizados para historial medico y seguimiento GLP-1.
4. **Task management:** Separacion de tareas entre Rosy (recepcion) y Melina (asistente clinica).
5. **Check-in/Check-out QR:** Codigos QR para registro de entrada y salida de pacientes presenciales.

### Modelo de Negocio

- Consultas de endocrinologia (presencial + telemedicina)
- Seguimiento de pacientes con tratamientos GLP-1
- Cobro antes de consulta (pago adelantado para Zoom)
- Consultas recurrentes — pacientes de largo plazo

### Problemas Recurrentes

| # | Problema | Impacto | Estado |
|---|----------|---------|--------|
| P1 | Links de Zoom duplicados | Pacientes reciben 2 links diferentes | Resuelto |
| P2 | Mensajes de confirmacion multiples | Varias confirmaciones por misma cita | Resuelto |
| P3 | AI no suficientemente especifica | Respuestas genericas sobre endocrinologia | Activo |
| P4 | Calendarios duplicados | Conflictos de disponibilidad | Resuelto |

### Stack Tecnico

- **Messaging:** WhatsApp Business con AI chatbot
- **Video:** Zoom para telemedicina
- **Ads:** Meta Ads
- **Forms:** Custom forms para historial medico y GLP-1 tracking
- **Operations:** QR check-in/check-out, task management Rosy/Melina

### Contexto Operativo

- Dra. Ana es medico primero, empresaria segundo. Tecnologia debe funcionar sin su intervencion.
- Rosy maneja recepcion. Melina maneja clinica. No deben solaparse.
- Telemedicina (Zoom) es canal de ingresos creciente.
- Pacientes GLP-1 son de alto valor y largo plazo. Seguimiento personalizado es diferenciador.

---

## Client

| Campo | Valor |
|-------|-------|
| Nombre comercial | Dra. Ana Teniente — Endocrinologia |
| Tipo | Consultorio medico (endocrinologia) |
| Modalidad | Presencial + Telemedicina (Zoom) |
| Contacto principal | Dra. Ana Teniente |
| Recepcionista | Rosy |
| Asistente clinica | Melina |
| Estado de cuenta | Activo |

### Equipo y Roles

| Persona | Rol | Responsabilidades |
|---------|-----|-------------------|
| Dra. Ana Teniente | Medico / Duena | Consultas, aprobacion de cambios |
| Rosy | Recepcionista | Agendamiento, confirmaciones, cobros, QR check-in |
| Melina | Asistente clinica | Historial medico, seguimiento GLP-1, preparacion de consulta |

### Servicios KWIQ Activos

| Servicio | Estado | Notas |
|----------|--------|-------|
| WhatsApp AI | Activo | Necesita mas especificidad |
| Zoom integration | Activo | Link solo despues de pago |
| Meta Ads | Activo | Captacion de pacientes |
| Custom forms | Activo | Historial + GLP-1 tracking |
| QR Check-in/Check-out | Activo | Pacientes presenciales |
| Task management | Activo | Separacion Rosy / Melina |

### Notas de Relacion

- Dra. Ana confia en KWIQ pero se frustra cuando la tecnologia falla frente a pacientes.
- Rosy y Melina son usuarios diarios — UX debe ser simple y sin ambiguedad.
- Pacientes GLP-1 son el segmento de mayor crecimiento y valor.
- Regla innegociable: Zoom link solo despues de pago.

---

## Decisions

**D1: Eliminacion de Calendarios Duplicados** — Un solo calendario maestro para todas las citas. Dos calendarios = doble booking. Links de Zoom se generan desde calendario unico.

**D2: Separacion de Tareas Rosy / Melina** — Rosy: recepcion (agendamiento, confirmaciones, cobros, check-in). Melina: clinica (historial, GLP-1, preparacion). El sistema notifica solo a la persona relevante.

**D3: QR Check-in/Check-out** — Codigos QR para registro automatizado de entrada y salida. Mide tiempos de espera y duracion de consulta.

**D4: Link de Zoom Solo Despues de Pago** — Agendar -> pagar -> recibir link. Sin pago, sin link. Protege ingresos.

**D5: AI con Contexto Especifico de Endocrinologia** — Enriquecer prompt con servicios, tratamientos GLP-1, precios, diferencia presencial/telemedicina. Estado: en progreso.

---

## Backlog

| # | Item | Prioridad |
|---|------|-----------|
| B1 | Mejorar especificidad del AI | Alta |
| B2 | GLP-1 patient tracking dashboard | Alta |
| B3 | Integrar pagos en flujo de WhatsApp | Media |
| B4 | Reportes de QR check-in/check-out | Media |
| B5 | Automatizar recordatorios pre-consulta | Baja |

---

## Reglas
- Habla en espanol
- No inventes datos
- Opera SOLO dentro de este cliente
- No mezcles con otros proyectos
