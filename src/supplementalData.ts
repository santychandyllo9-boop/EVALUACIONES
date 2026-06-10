/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GradeKey, PeriodKey } from "./types";

export interface SupplementalPeriodData {
  cwWords: string[];
  cwPistas: string[];
  sopaWords: string[];
  sopaPistas: string[];
}

export const supplementalDB: Record<GradeKey, Record<PeriodKey, SupplementalPeriodData>> = {
  "6": {
    "1": {
      cwWords: ["MONITOR", "IMPRESORA", "ESCANER", "DISCO", "BOCINA"],
      cwPistas: [
        "6. Dispositivo de salida para ver la imagen o pantalla.",
        "7. Periférico de salida que plasma en papel documentos.",
        "8. Periférico de entrada que digitaliza documentos físicos.",
        "9. Unidad de almacenamiento secundario donde se guardan archivos permanentes.",
        "10. Dispositivo de salida de audio que reproduce sonidos."
      ],
      sopaWords: ["MICROFONO", "CAMARA", "MEMORIA", "CHIP", "PUERTO"],
      sopaPistas: [
        "Periférico de entrada que captura sonido físico.",
        "Cámara para capturar video e imágenes.",
        "Unidad o tarjeta de almacenamiento flash.",
        "Silicio integrado semiconductor diminuto.",
        "Ranura o hembra de conexión física."
      ]
    },
    "2": {
      cwWords: ["WINDOWS", "MACOS", "LINUX", "CARPETA", "MENU"],
      cwPistas: [
        "6. Sistema operativo comercial muy popular de Microsoft.",
        "7. Sistema operativo elegante de computadores Apple.",
        "8. Sistema operativo de código abierto y libre.",
        "9. Contenedor virtual para agrupar otros archivos.",
        "10. Elemento de interfaz con lista de comandos."
      ],
      sopaWords: ["PUNTERO", "FONDO", "BARRA", "APLICAR", "SELECCION"],
      sopaPistas: [
        "Flecha de cursor movida por el ratón.",
        "Imagen decorativa del escritorio de pantalla.",
        "Franja o panel con indicadores del sistema.",
        "Confirmar y guardar una opción de software.",
        "Tener un elemento marcado para edición."
      ]
    },
    "3": {
      cwWords: ["EDITOR", "NEGRITA", "CURSIVA", "SUBSCRITO", "REGLA"],
      cwPistas: [
        "6. Tipo de programa para redactar y dar estilo a textos.",
        "7. Estilo de fuente que resalta las letras haciéndolas gruesas.",
        "8. Estilo de fuente inclinado usado para énfasis.",
        "9. Texto de menor tamaño posicionado abajo de la línea de base.",
        "10. Guía visual superior para regular tabuladores de hoja."
      ],
      sopaWords: ["ESTILO", "SANGRIA", "ALINEADO", "TITULO", "IMPRIMIR"],
      sopaPistas: [
        "Conjunto de formatos grabados aplicables rápido.",
        "Espacio de margen otorgado al inicio de un párrafo.",
        "Ubicación del párrafo (izquierda, centrado o derecha).",
        "Encabezado destacado superior de un tema.",
        "Enviar hojas físicas de texto al papel."
      ]
    },
    "4": {
      cwWords: ["CORREO", "SPAM", "CLAVE", "ENLACE", "USUARIO"],
      cwPistas: [
        "6. Servicio para correspondencia electrónica asincrónica.",
        "7. Correo electrónico masivo basurero no deseado.",
        "8. Contraseña obligatoria de seguridad para accesos.",
        "9. Dirección interactiva o URL clicable para saltar.",
        "10. Credencial única de ingreso con nombre personal."
      ],
      sopaWords: ["PAGINA", "WIFI", "REDES", "BLOQUEO", "VIRUS"],
      sopaPistas: [
        "Documento o portal web consultado en internet.",
        "Conectividad inalámbrica de radiofrecuencia.",
        "Comunidad virtual interactiva (social).",
        "Acción de seguridad para restringir intrusos.",
        "Programa malicioso capaz de infectar archivos."
      ]
    }
  },
  "7": {
    "1": {
      cwWords: ["DIGITAL", "ANALOGO", "DISQUETE", "FIBRA", "BINARIO"],
      cwPistas: [
        "6. Sistema de codificación basado en dígitos discretos.",
        "7. Señal continua de ondas físicas tradicionales.",
        "8. Disco magnético extraíble cuadrado antiguo de baja capacidad.",
        "9. Cable de luz de vidrio para datos a hipervelocidad.",
        "10. Sistema matemático de ceros y unos usado en cómputo."
      ],
      sopaWords: ["ABACO", "TRANSISTOR", "CHIP", "NUBE", "DATOS"],
      sopaPistas: [
        "Calculadora decimal manual antigua de cuentas.",
        "Componente semiconductor de conmutación electrónica.",
        "Circuito central integrado pequeño de silicio.",
        "Almacenamiento remoto conectado en internet.",
        "Información cruda sin procesar por la CPU."
      ]
    },
    "2": {
      cwWords: ["SUMAR", "RESTAR", "MULTIPLICAR", "PROMEDIO", "GRAFICO"],
      cwPistas: [
        "6. Operación básica de adición matemática en celdas.",
        "7. Operación aritmética de sustracción o diferencia.",
        "8. Operación de producto rápido repetitivo.",
        "9. Función que calcula el valor aritmético central.",
        "10. Dibujo estadístico representativo de números integrados."
      ],
      sopaWords: ["CELDA", "FILA", "COLUMNA", "RANGO", "LIBRO"],
      sopaPistas: [
        "Intersección de fila y columna en cuadrícula.",
        "Línea de celdas horizontal numerada.",
        "Línea vertical identificada por letras.",
        "Agrupación de celdas unidas consecutivas.",
        "Archivo completo de hojas de cálculo."
      ]
    },
    "3": {
      cwWords: ["DISEÑO", "ELEMENTO", "ANIMACION", "PROCTOR", "LOGOPEDIA"],
      cwPistas: [
        "6. Aspecto estético y distribución visual de diapositiva.",
        "7. Caja, imagen, icono o cuadro de texto en lámina.",
        "8. Efecto de movimiento aplicado a textos o figuras.",
        "9. Equipo de proyección de luz que transmite a telón.",
        "10. Presentación con audio guiado autónomamente."
      ],
      sopaWords: ["DIAPOSITIVA", "TRANSICION", "PLANTILLA", "INICIO", "CIERRE"],
      sopaPistas: [
        "Lámina individual o lienzo de diapositiva.",
        "Efecto de cambio entre páginas presentadas.",
        "Molde de diseño estético del proyector.",
        "Arranque o introducción formal de la exposición.",
        "Conclusión final y resumen del expositor."
      ]
    },
    "4": {
      cwWords: ["NOMBRES", "ETIQUETA", "REGISTRO", "PATENTES", "NETIQUETA"],
      cwPistas: [
        "6. Identidad de usuarios con su respectivo copyright.",
        "7. Normativas y buenas conductas de comportamiento online.",
        "8. Sello público que otorga exclusividad sobre inventos.",
        "9. Registro de marcas para marcas comerciales de creador.",
        "10. Normas éticas de respeto al chatear en foros."
      ],
      sopaWords: ["PLAGIO", "LICENCIA", "AUTOR", "COPIA", "ETICA"],
      sopaPistas: [
        "Robar ideas o textos ajenos como propios.",
        "Permiso jurídico formal de uso de contenidos.",
        "Creador original intelectual de una obra.",
        "Duplicado no autorizado de un archivo.",
        "Valores morales aplicados a la sociedad digital."
      ]
    }
  },
  "8": {
    "1": {
      cwWords: ["PUERTO", "ANTENA", "CONEXION", "CABLE", "CIBER"],
      cwPistas: [
        "6. Conector físico posterior para cable del computador.",
        "7. Transmisor y receptor aéreo de ondas de radio.",
        "8. Enlace de comunicación activo entre dos nodos.",
        "9. Hilo físico de cobre trenzado guiador de red.",
        "10. Prefijo asociado al entorno tecnológico en red."
      ],
      sopaWords: ["LAN", "WAN", "ROUTER", "SWITCH", "PROTOCOLOS"],
      sopaPistas: [
        "Red de área hogareña o escolar local.",
        "Red de área geográfica amplia global.",
        "Enrutador inteligente de paquetes externos.",
        "Conmutador de cables de la red informática.",
        "Reglas estandarizadas de conectividad en red."
      ]
    },
    "2": {
      cwWords: ["FILTRAR", "ORDENAR", "CONTAR", "MAXIMO", "MINIMO"],
      cwPistas: [
        "6. Mostrar celdas que cumplen un criterio ocultando el resto.",
        "7. Clasificar registros alfabética o numéricamente.",
        "8. Función de conteo de celdas con datos numéricos.",
        "9. Función que halla el mayor valor de un conjunto.",
        "10. Función que extrae el menor valor numérico."
      ],
      sopaWords: ["PROMEDIO", "SI", "BUSCAR", "SUMATORIA", "CONDICION"],
      sopaPistas: [
        "Media aritmética de un conjunto de datos.",
        "Función para bifurcar según prueba lógica.",
        "Localizar un registro en una matriz.",
        "Adición rápida del rango de datos.",
        "Criterio obligatorio a verificar lógicamente."
      ]
    },
    "3": {
      cwWords: ["RETORNO", "CICLO", "DECIDIR", "ENTRADA", "SALIDA"],
      cwPistas: [
        "6. Envío de valor final devuelto por una instrucción.",
        "7. Bucle repetitivo de instrucciones iteradas.",
        "8. Escoger un camino lógico según condicional.",
        "9. Captura de datos ingresados por el usuario.",
        "10. Impresión o entrega de resultados procesados."
      ],
      sopaWords: ["ALGORITMO", "PSEUDO", "DIAGRAMA", "VARIABLE", "INICIO"],
      sopaPistas: [
        "Fórmula secuencial ordenada de pasos lógicos.",
        "Borrador de programación cercano al habla humana.",
        "Esquema visual gráfico del proceso lógico.",
        "Espacio de memoria de valor alternable.",
        "Punto inicial de partida del algoritmo."
      ]
    },
    "4": {
      cwWords: ["AUTOR", "COMENTARIO", "GADGET", "VISITA", "BLOGGER"],
      cwPistas: [
        "6. El redactor y administrador principal del diario web.",
        "7. Mensaje dejado por un lector en la publicación.",
        "8. Accesorio pequeño de interfaz auxiliar en pantalla.",
        "9. Contador de lectores que consultan en línea.",
        "10. Herramientas básicas para publicar bitácoras de Google."
      ],
      sopaWords: ["DOMINIO", "POST", "PLANTILLA", "BANNER", "DIARIO"],
      sopaPistas: [
        "Dirección o URL textual única del blog.",
        "Entrada o publicación unitaria cronológica.",
        "Estructura pre-diseñada regulable del blog.",
        "Imagen de cabecera superior promocional.",
        "Bitácora periódica subida a internet."
      ]
    }
  },
  "9": {
    "1": {
      cwWords: ["OBJETO", "ESCENARIO", "DISFRAZ", "SONIDO", "COORDENADA"],
      cwPistas: [
        "6. Actor o sprite interactivo dentro de Scratch.",
        "7. Lienzo o fondo gráfico donde ocurren acciones.",
        "8. Pose o apariencia visual alternable del objeto.",
        "9. Clip de audio asociado a un bloque de evento.",
        "10. Ubicación posicional X, Y de trazados matemáticos."
      ],
      sopaWords: ["SCRATCH", "BUCLE", "CONDICION", "VARIABLE", "PULSAR"],
      sopaPistas: [
        "Entorno educativo interactivo de bloques.",
        "Instrucción de repetición o ciclo sinfín.",
        "Evaluación lógica de bifurcación de acciones.",
        "Caja nombrada para almacenar puntajes.",
        "Presionar el ratón sobre un elemento visual."
      ]
    },
    "2": {
      cwWords: ["RELACION", "ATRIBUTO", "MOTOR", "CONSULTA", "LLAVE"],
      cwPistas: [
        "6. Vínculo lógico de asociación entre dos tablas.",
        "7. Características descriptivas de una columna de campo.",
        "8. Servidor o sistema gestor de la base de datos.",
        "9. Sentencia con filtros para retornar información.",
        "10. Identificador primario de registro sin duplicidad."
      ],
      sopaWords: ["TABLAS", "REGISTRO", "CAMPO", "SQL", "DATOS"],
      sopaPistas: [
        "Estructuras de cuadrícula que agrupan registros.",
        "Fila con datos específicos de una entidad.",
        "Columna tipificada de un listado de tabla.",
        "Lenguaje estructurado de consultas estandarizado.",
        "Registros numéricos e informativos guardados."
      ]
    },
    "3": {
      cwWords: ["ARDUINO", "ACTUADOR", "LED", "PILA", "CABLE"],
      cwPistas: [
        "6. Placa microcontroladora de hardware libre muy popular.",
        "7. Elemento mecánico que genera movimiento o fuerza.",
        "8. Diodo emisor de luz de bajísimo consumo.",
        "9. Unidad química portadora autónoma de energía eléctrica.",
        "10. Hilo de cobre conductor que conecta el circuito."
      ],
      sopaWords: ["SENSORES", "MOTORES", "PROCESO", "CIRCUITO", "PLACA"],
      sopaPistas: [
        "Dispositivo detector de proximidad o luz.",
        "Sistemas giratorios electromecánicos integrados.",
        "Rutina secuencial lógicamente estructurada.",
        "Camino cerrado para tránsito de electrones.",
        "Plaqueta física portadora de microprocesador."
      ]
    },
    "4": {
      cwWords: ["TOXICO", "RECI_CLADO", "DESECHO", "SOSTENI", "EWASTE"],
      cwPistas: [
        "6. Dañino para la salud ambiental y ecosistemas.",
        "7. Procesamiento ecológico e industrial de basura.",
        "8. Residuo inservible tecnológico desechado rápido.",
        "9. Modelo sustentable respetuoso con la ecología.",
        "10. Chatarra de computadores y pantallas inservibles."
      ],
      sopaWords: ["PLOMO", "COBRE", "VIDRIO", "METAL", "VERDE"],
      sopaPistas: [
        "Metal pesado altamente venenoso.",
        "Conductor dúctil de circuitos internos.",
        "Material inerte de revestimiento de pantallas.",
        "Componente físico duro de carcasas rígidas.",
        "Enfoque tecnológico ecológico que favorece el entorno."
      ]
    }
  },
  "10": {
    "1": {
      cwWords: ["IP", "PUERTO", "REDIRE_C", "ENLACE", "FIBRA"],
      cwPistas: [
        "6. Dirección numérica única asignada a un computador.",
        "7. Canal o interfaz de salida virtual de internet.",
        "8. Redirección de tráfico de red a otro servidor.",
        "9. Conexión activa bidireccional entre nodos.",
        "10. Filamento velocísimo de luz para tránsitos de red."
      ],
      sopaWords: ["PROTOCOLOS", "DNS", "PAQUETES", "HOST", "INTERNET"],
      sopaPistas: [
        "Reglas universales compartidas de comunicación.",
        "Traductor lógico de URL a dirección de red.",
        "Fracciones numeradas del flujo de datos en tránsito.",
        "Servidor o nodo terminal en la topología.",
        "Espacio de redes descentralizadas mundial."
      ]
    },
    "2": {
      cwWords: ["ENTERO", "MATRIZ", "CICLO", "CLASE", "OBJETO"],
      cwPistas: [
        "6. Tipo de dato numérico exacto sin posiciones decimales.",
        "7. Conjunto dimensional de variables agrupadas.",
        "8. Bucle for o while para iterar ejecuciones repetitivas.",
        "9. Molde o plantilla de programación orientada a objetos.",
        "10. Instancia específica creada a partir de una clase estructurada."
      ],
      sopaWords: ["VARIABLES", "FLOAT", "STRING", "BOOLEANO", "FUNCION"],
      sopaPistas: [
        "Contenedores de memoria que varían su valor.",
        "Tipo numérico con punto decimal flotante.",
        "Tipo de dato literal de caracteres de texto.",
        "Variable lógica de valor únicamente lógico.",
        "Grupo de instrucciones reutilizables estructuradas."
      ]
    },
    "3": {
      cwWords: ["VISTA", "SECUENCIA", "INDEX", "CLAVE", "REGISTRO"],
      cwPistas: [
        "6. Tabla virtual conformada por consultas SQL predefinidas.",
        "7. Pasos o series estructuradas de consulta secuencial.",
        "8. Estructura que acelera las búsquedas en la tabla.",
        "9. Campo identificador exclusivo de registro en base de datos.",
        "10. Fila de la base de datos que representa una entidad."
      ],
      sopaWords: ["SELECT", "FROM", "WHERE", "UPDATE", "INSERT"],
      sopaPistas: [
        "Extraer columnas de una planilla de base de datos.",
        "Indicar la tabla de origen de la consulta.",
        "Condición filtradora de filas de resultados.",
        "Actualizar registros grabados con nuevos valores.",
        "Añadir nuevas filas de registros a tablas."
      ]
    },
    "4": {
      cwWords: ["DOMOTICA", "WIFI", "IP", "MALLA", "SENSORES"],
      cwPistas: [
        "6. Automatización de casas inteligentes usando sensores.",
        "7. Señales aéreas caseras inalámbricas transmisoras.",
        "8. Dirección numérica de conexión única para red.",
        "9. Topología de enrutamiento descentralizado estable.",
        "10. Lectores físicos de variables ambientales de IoT."
      ],
      sopaWords: ["NODO", "SMART", "CANAL", "INTERNET", "FUEGO"],
      sopaPistas: [
        "Dispositivo conectado receptor terminal de malla.",
        "Sufijo de equipo inteligente de la vivienda.",
        "Frecuencia electromagnética portadora de bytes.",
        "Red mundial unificadora conectada constante.",
        "Muro seguro protector informático de red (Firewall)."
      ]
    }
  },
  "11": {
    "1": {
      cwWords: ["HTML", "MARCADO", "DIV", "COLOR", "FUENTE"],
      cwPistas: [
        "6. Lenguaje de marcado de hipertexto estandarizado.",
        "7. Formato técnico mediante etiquetas estructurales.",
        "8. Etiqueta contenedora básica para agrupar en capas.",
        "9. Tonalidad o fondo cromático asignado por CSS.",
        "10. Tipografía o tipo de letra interpretada por pantalla."
      ],
      sopaWords: ["ETIQUETA", "CSS", "BODY", "HEADER", "ESTILOS"],
      sopaPistas: [
        "Componente básico de apertura y cierre de tags HTML.",
        "Hojas de diseño cosmético visual en cascada.",
        "Cuerpo visible del documento del portal.",
        "Cabecera o bloque de inicio del sitio corporativo.",
        "Reglas visuales de diseño grabadas en CSS."
      ]
    },
    "2": {
      cwWords: ["IA", "CHATBOT", "ALGORITMO", "PESOS", "PROCESO"],
      cwPistas: [
        "6. Inteligencia artificial y simulación cognitiva computada.",
        "7. Asistente interactivo con respuesta en lenguaje natural.",
        "8. Lógica matemática guiadora del modelo predictivo.",
        "9. Factores numéricos sinápticos de calibración de neurona.",
        "10. Flujo secuencial de datos analizados en red."
      ],
      sopaWords: ["M_LEARNING", "RED_NEURO", "DATOS", "ENTRENA", "SESGO"],
      sopaPistas: [
        "Aprendizaje automático a través de big data.",
        "Red interconectada simuladora de sinapsis.",
        "Registros numéricos necesarios para entrenamiento.",
        "Suministro de datos históricos para ajuste de modelo.",
        "Sesgo o error de predictibilidad debido a datos."
      ]
    },
    "3": {
      cwWords: ["VIRUS", "HACKER", "ROBO", "TOKEN", "FIREWALL"],
      cwPistas: [
        "6. Código hostil destructivo de archivos locales.",
        "7. Auditor o intruso especialista en vulnerabilidades de red.",
        "8. Sustracción delictiva de datos y registros privados.",
        "9. Dispositivo o clave dinámica temporal segura.",
        "10. Cortafuegos protector de redes contra piratas informáticos."
      ],
      sopaWords: ["CIFRADO", "MALWARE", "PHISHING", "FIRMA", "CLAVES"],
      sopaPistas: [
        "Protección matemática para codificar textos ilegibles.",
        "Cualquier software dañino intruso saboteador.",
        "Suplantación de identidad para estafa de accesos.",
        "Rúbrica encriptada identificadora del emisor.",
        "Contraseñas personales secretas de alta seguridad."
      ]
    },
    "4": {
      cwWords: ["PLANO", "METAS", "GANTT", "COSTOS", "RIESGO"],
      cwPistas: [
        "6. Bosquejo de diseño estructurado del software.",
        "7. Propósitos finales delimitados de programación con usuarios.",
        "8. Cronograma tabular que mide avance y calendarios.",
        "9. Presupuesto material de factibilidad económica de la solución.",
        "10. Amenaza potencial identificada que puede demorar el cierre."
      ],
      sopaWords: ["PROYECTOS", "DISEÑO", "ANALISIS", "PLANILLA", "ETAPAS"],
      sopaPistas: [
        "Propuestas innovadoras dirigidas a resolver necesidades.",
        "Fase de maquetación visual y distribución gráfica.",
        "Estudio formal exhaustivo de requerimientos del cliente.",
        "Hoja de Excel con control de cronogramas.",
        "Hitos sucesivos lógicos de desarrollo ordenados."
      ]
    }
  }
};
