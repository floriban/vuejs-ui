export const httpPages = [
  {
    "code": 400,
    "label": "Solicitud incorrecta",
    "title": "Revisemos ese paso",
    "subtitle": "Algo no llegó como esperábamos.",
    "description": "La información enviada está incompleta o no se pudo leer. Vuelve al paso anterior y revisa lo que ingresaste.",
    "scene": "paper"
  },
  {
    "code": 401,
    "label": "Autenticación requerida",
    "title": "Primero, identifícate",
    "subtitle": "Este espacio necesita saber quién eres.",
    "description": "Para continuar necesitas iniciar sesión con tu cuenta. Si ya lo hiciste, es posible que debas identificarte nuevamente.",
    "scene": "door"
  },
  {
    "code": 403,
    "label": "Acceso denegado",
    "title": "Esta puerta necesita permiso",
    "subtitle": "Tu cuenta no tiene acceso a esta sección.",
    "description": "Puedes seguir usando las otras áreas. Si necesitas entrar aquí, pide al administrador que revise los permisos de tu cuenta.",
    "scene": "door"
  },
  {
    "code": 404,
    "label": "Página no encontrada",
    "title": "¿Nos salimos del camino?",
    "subtitle": "No encontramos el lugar que buscabas.",
    "description": "Puede que el enlace haya cambiado o que la dirección esté mal escrita. Volvamos al inicio para encontrar tu camino.",
    "scene": "landscape"
  },
  {
    "code": 408,
    "label": "Tiempo de espera agotado",
    "title": "La conexión se tomó una pausa",
    "subtitle": "Tu solicitud no llegó a tiempo.",
    "description": "Revisa tu conexión a internet y vuelve al paso anterior para intentarlo de nuevo.",
    "scene": "clock"
  },
  {
    "code": 419,
    "label": "Sesión caducada",
    "title": "Tu sesión llegó a su fin",
    "subtitle": "Es momento de volver a entrar.",
    "description": "La sesión ya no está activa. Vuelve a iniciar sesión para continuar; si estabas completando un formulario, revisa tus datos antes de enviarlo otra vez.",
    "scene": "clock"
  },
  {
    "code": 422,
    "label": "Datos no válidos",
    "title": "Hay un detalle por revisar",
    "subtitle": "Algunos datos necesitan un pequeño ajuste.",
    "description": "Vuelve al formulario y revisa los campos indicados. Puede faltar información o haber un dato con un formato diferente al esperado.",
    "scene": "paper"
  },
  {
    "code": 429,
    "label": "Demasiadas solicitudes",
    "title": "Vamos un poco más despacio",
    "subtitle": "Hemos recibido muchas solicitudes seguidas.",
    "description": "Espera un momento antes de volver a intentarlo. Así podremos atender tu solicitud sin interrupciones.",
    "scene": "clock"
  },
  {
    "code": 500,
    "label": "Error del servidor",
    "title": "Algo se salió de su sitio",
    "subtitle": "No pudimos completar lo que pediste.",
    "description": "Hay un problema de nuestro lado. Inténtalo más tarde y, si vuelve a ocurrir, comunícalo al administrador.",
    "scene": "repair"
  },
  {
    "code": 502,
    "label": "Respuesta no válida",
    "title": "Nos falta una conexión",
    "subtitle": "Una parte del servicio no respondió como esperábamos.",
    "description": "No pudimos completar tu solicitud porque otro servicio devolvió una respuesta inesperada. Inténtalo en unos momentos.",
    "scene": "connection"
  },
  {
    "code": 503,
    "label": "Servicio no disponible",
    "title": "Hacemos una pausa",
    "subtitle": "Este servicio no está disponible por ahora.",
    "description": "Puede estar en mantenimiento o atendiendo más solicitudes de lo habitual. Vuelve a visitarnos en unos momentos.",
    "scene": "repair"
  },
  {
    "code": 504,
    "label": "Tiempo de espera agotado",
    "title": "La respuesta viene con demora",
    "subtitle": "Otro servicio está tardando más de lo esperado.",
    "description": "No pudimos recibir su respuesta a tiempo. Espera un momento antes de volver a intentarlo.",
    "scene": "connection"
  }
] as const
export type HttpPageCode = typeof httpPages[number]['code']
export function getHttpPage(code: number) {
 return httpPages.find(page => page.code === code) ?? httpPages[3]
}
