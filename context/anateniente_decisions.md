# KWIQ — Dra. Ana Teniente — Decisions

## D1: Eliminación de Calendarios Duplicados

**Contexto:** Existían 2 calendarios sincronizados para la Dra. Ana. Ambos aceptaban citas, generando conflictos de disponibilidad y links de Zoom duplicados.
**Decisión:** Eliminar el calendario duplicado. Un solo calendario maestro para todas las citas (presenciales y telemedicina).
**Razón:** Dos calendarios = doble booking posible. Un calendario único elimina conflictos de raíz. Los links de Zoom se generan desde este calendario único.

## D2: Separación de Tareas Rosy / Melina

**Contexto:** Rosy y Melina recibían las mismas notificaciones y tareas, generando duplicación de esfuerzo o tareas que ninguna completaba porque cada una asumía que la otra lo haría.
**Decisión:** Separar el pipeline de tareas: Rosy maneja recepción (agendamiento, confirmaciones, cobros, check-in). Melina maneja clínica (historial médico, seguimiento GLP-1, preparación de consulta).
**Razón:** Roles claros eliminan ambigüedad. Cada persona sabe exactamente qué le corresponde. El sistema notifica solo a la persona relevante.

## D3: QR Check-in / Check-out para Pacientes Presenciales

**Contexto:** No había forma automatizada de registrar la llegada y salida de pacientes presenciales. El control era manual y se perdían datos.
**Decisión:** Implementar códigos QR que los pacientes escanean al llegar (check-in) y al salir (check-out).
**Razón:** Automatiza el registro de asistencia. Permite medir tiempos de espera y duración de consulta. Datos útiles para optimizar la agenda de la Dra. Ana.

## D4: Link de Zoom Solo Después de Pago

**Contexto:** Algunos pacientes recibían el link de Zoom antes de pagar, entraban a la consulta y luego no pagaban o pagaban tarde.
**Decisión:** El link de Zoom se genera y envía únicamente después de confirmar el pago.
**Razón:** Protege los ingresos de la Dra. Ana. Elimina consultas no pagadas. El flujo es: agendar -> pagar -> recibir link. Sin pago, sin link.

## D5: AI con Contexto Específico de Endocrinología

**Contexto:** El AI chatbot daba respuestas genéricas a preguntas sobre servicios. Pacientes preguntaban sobre tratamientos GLP-1 y recibían respuestas vagas.
**Decisión:** Enriquecer el prompt del AI con información específica de endocrinología: servicios ofrecidos, tratamientos GLP-1, precios de consulta, diferencia entre presencial y telemedicina.
**Razón:** En medicina especializada, las respuestas genéricas erosionan confianza. El paciente necesita saber que el consultorio entiende su condición antes de agendar.
**Estado:** En progreso — el AI todavía no es suficientemente específica.
