/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GradeKey, PeriodKey } from "./types";

export interface AcademicPeriodData {
  topic: string;
  cwWords: string[];
  cwPistas: string[];
  sopaWords: string[];
  sopaPistas: string[];
  quiz: {
    q: string;
    o: string[];
    a: string;
  }[];
  open: {
    q: string;
  }[];
}

const rawAcademicDB: Record<GradeKey, Record<PeriodKey, AcademicPeriodData>> = {
  "6": {
    "1": {
      topic: "Introducción a la Informática: Hardware, Software y Periféricos",
      cwWords: ["HARDWARE", "SOFTWARE", "TECLADO", "MEMORIA", "PROCESADOR"],
      cwPistas: [
        "1. Componentes físicos y tangibles de un computador.",
        "2. Conjunto de programas, instrucciones y reglas informáticas.",
        "3. Periférico de entrada principal para ingresar texto escrito.",
        "4. Componente que almacena temporalmente los datos en ejecución.",
        "5. El cerebro digital de la máquina que realiza los cálculos principales (CPU)."
      ],
      sopaWords: ["SOPORTE", "PANTALLA", "CARPETA", "RATON", "PARLANTE"],
      sopaPistas: [
        "Asistencia técnica para hardware y software.",
        "Dispositivo visual para ver la interfaz.",
        "Contenedor virtual usado para organizar archivos.",
        "Dispositivo señalador manual (Mouse).",
        "Dispositivo de salida de señal de audio."
      ],
      quiz: [
        {
          q: "¿Cuál de las siguientes opciones es un dispositivo puramente de salida?",
          o: ["Teclado", "Impresora", "Escáner", "Ratón"],
          a: "Impresora"
        },
        {
          q: "¿Qué componente de hardware se considera el 'cerebro' directo del ordenador?",
          o: ["Memoria RAM", "Disco Rígido", "Procesador (CPU)", "Tarjeta Madre"],
          a: "Procesador (CPU)"
        }
      ],
      open: [
        {
          q: "Explique con sus propias palabras cuál es la diferencia fundamental entre el Hardware y el Software en la tecnología actual."
        }
      ]
    },
    "2": {
      topic: "El Sistema Operativo y la Interfaz Gráfica de Usuario",
      cwWords: ["SISTEMA", "ESCRITORIO", "ICONO", "VENTANA", "ARCHIVO"],
      cwPistas: [
        "1. El software principal que administra los recursos de hardware.",
        "2. Pantalla principal del sistema desde donde se inicia el trabajo.",
        "3. Pequeña imagen que representa un archivo, programa o función.",
        "4. Área rectangular en pantalla que muestra la interfaz de un programa.",
        "5. Conjunto de datos con nombre guardado de forma permanente."
      ],
      sopaWords: ["BARRA", "CARPETA", "MENU", "BOTON", "INICIO"],
      sopaPistas: [
        "Franja horizontal inferior de tareas.",
        "Agrupador de subcarpetas y documentos.",
        "Lista de opciones que se despliega al usuario.",
        "Elemento gráfico que se puede presionar.",
        "Punto de partida y acceso a todos los programas."
      ],
      quiz: [
        {
          q: "¿Cuál es la función principal de un Sistema Operativo?",
          o: [
            "Crear documentos de Word",
            "Navegar únicamente por las redes sociales",
            "Administrar de forma ordenada el software y hardware del PC",
            "Hacer que la computadora funcione sin energía eléctrica"
          ],
          a: "Administrar de forma ordenada el software y hardware del PC"
        }
      ],
      open: [
        {
          q: "Describa la importancia de la interfaz gráfica y cómo facilita que cualquier persona use un computador sin saber código de programación."
        }
      ]
    },
    "3": {
      topic: "Fundamentos de Procesadores de Texto y Formato de Documentos",
      cwWords: ["FORMATO", "PARRAFO", "FUENTE", "MARGENES", "PARRAFO"], // De-duped safely below
      cwPistas: [
        "1. Estilo visual que se le aplica al texto o página.",
        "2. Bloque de oraciones separadas por punto y aparte.",
        "3. Tipo o familia de letra seleccionada en el menú.",
        "4. Espacios en blanco situados alrededor del borde de la hoja."
      ],
      sopaWords: ["ESTILO", "NEGRITA", "CURSIVA", "REGLA", "TABLA"],
      sopaPistas: [
        "Diseño que predefine la estructura visual.",
        "Estilo que hace la letra más gruesa.",
        "Inclinación elegante dada al texto.",
        "Guía métrica visible para ajustar márgenes.",
        "Grilla de filas y columnas para organizar datos."
      ],
      quiz: [
        {
          q: "¿Cuál comando rápido se usa para guardar un documento en la mayoría de programas?",
          o: ["Ctrl + C", "Ctrl + V", "Ctrl + G (o Ctrl + S)", "Ctrl + Z"],
          a: "Ctrl + G (o Ctrl + S)"
        }
      ],
      open: [
        {
          q: "¿Por qué es importante fijar márgenes y correctas fuentes antes de comenzar a redactar un trabajo escolar profesional?"
        }
      ]
    },
    "4": {
      topic: "Navegación en Internet y Seguridad Básica Digital",
      cwWords: ["INTERNET", "BUSCADOR", "CORREO", "NAVEGADOR", "FUEGO"],
      cwPistas: [
        "1. Red global de computadores interconectados.",
        "2. Programa web que ayuda a encontrar sitios escribiendo palabras claves.",
        "3. Servicio digital para el envío de mensajes asincrónicos.",
        "4. Aplicación usada para ingresar a páginas web.",
        "5. Muro para detener intrusos externos (Cortafuegos/Firewall)."
      ],
      sopaWords: ["ENLACE", "CORREO", "USUARIO", "CLAVE", "SPAM"],
      sopaPistas: [
        "Hipervínculo para saltar entre páginas.",
        "Envío de cartas de correo digital.",
        "Nombre identificador único de cuenta.",
        "Contraseña indispensable para ingresar.",
        "Correos masivos no deseados del buzón."
      ],
      quiz: [
        {
          q: "¿Cuál de las siguientes es una regla crucial de seguridad para navegar por Internet?",
          o: [
            "Compartir contraseñas con cualquier amigo en la web",
            "Descargar programas de páginas sospechosas",
            "No dar datos personales a desconocidos en chats públicos",
            "Dejar abiertas nuestras sesiones en computadores públicos"
          ],
          a: "No dar datos personales a desconocidos en chats públicos"
        }
      ],
      open: [
        {
          q: "Defina qué es el ciberacoso y qué acciones debe tomar si identifica que un compañero de la escuela es víctima de esto."
        }
      ]
    }
  },
  "7": {
    "1": {
      topic: "Historia de la computación, Redes de Información y Medios de Almacenamiento",
      cwWords: ["ABACO", "ELEMENTAL", "TRANSISTOR", "CHIP", "NUBE"],
      cwPistas: [
        "1. Herramienta antigua usada para realizar operaciones aritméticas simples.",
        "2. Nivel mínimo elemental de cómputo.",
        "3. Componente electrónico que reemplazó a los tubos de vacío e inició la era moderna.",
        "4. Circuito integrado diminuto de silicio.",
        "5. Almacenamiento virtual descentralizado accesible en internet."
      ],
      sopaWords: ["DIGITAL", "ANALOGO", "DISQUETE", "TARJETA", "FIBRA"],
      sopaPistas: [
        "Información representada por números discretos.",
        "Señal analógica de onda continua.",
        "Disco magnético antiguo flexible de baja capacidad.",
        "Placa base con circuitos de expansión.",
        "Medio físico veloz para transmitir datos vía luz."
      ],
      quiz: [
        {
          q: "¿Qué generación de computadores introdujo el uso de microprocesadores integrados?",
          o: ["Primera Generación", "Segunda Generación", "Tercera Generación", "Cuarta Generación"],
          a: "Cuarta Generación"
        }
      ],
      open: [
        {
          q: "Explique cómo evolucionó el almacenamiento físico de datos desde los disquetes magnéticos antiguos hasta los sistemas en la nube y discos de estado sólido actuales."
        }
      ]
    },
    "2": {
      topic: "Hojas de Cálculo: Celdas, Filas y Columnas Básicas",
      cwWords: ["CELDA", "FILA", "COLUMNA", "RANGO", "FORMULA"],
      cwPistas: [
        "1. Intersección única entre una fila y una columna.",
        "2. Conjunto horizontal de celdas identificadas por números.",
        "3. Conjunto vertical de celdas identificadas por letras.",
        "4. Agrupación unida de dos o más celdas.",
        "5. Ecuación que realiza cálculos automáticos basados en valores."
      ],
      sopaWords: ["SUMAR", "AUTO", "HOJA", "GRAFICO", "DATO"],
      sopaPistas: [
        "Operación de adición básica de valores.",
        "Disparo de comandos inmediatos (Auto-completar).",
        "Pestaña individual en el libro de cálculo.",
        "Representación visual de información numérica.",
        "Unidad de valor almacenado en celdas."
      ],
      quiz: [
        {
          q: "¿Con cuál símbolo se debe iniciar obligatoriamente la escritura de cualquier fórmula en Excel?",
          o: ["Símbolo de suma (+)", "Símbolo de asterisco (*)", "Símbolo de igual (=)", "Símbolo de porcentaje (%)"],
          a: "Símbolo de igual (=)"
        }
      ],
      open: [
        {
          q: "Detalle cómo una organización escolar o de negocios pequeña puede beneficiarse de las hojas de cálculo para administrar sus finanzas."
        }
      ]
    },
    "3": {
      topic: "Creación de Presentaciones Escolares Multimedia",
      cwWords: ["DIAPOSITIVA", "TRANSICION", "ELEMENTOS", "PLANTILLA", "INDICE"],
      cwPistas: [
        "1. Página o lámina individual que compone una presentación.",
        "2. Efecto visual al pasar de una diapositiva a la siguiente.",
        "3. Conjunto de recursos como textos, audios e imágenes.",
        "4. Diseño previo que facilita la creación estándar.",
        "5. Esquema inicial de las diapositivas de contenido."
      ],
      sopaWords: ["VIDEO", "AUDIO", "ZOOM", "BOTON", "FONDO"],
      sopaPistas: [
        "Archivo multimedia de clip con movimiento.",
        "Señal acústica o voz grabada.",
        "Acercamiento visual a un elemento importante.",
        "Elemento gráfico que se puede cliquear.",
        "Color o textura de detrás de la diapositiva."
      ],
      quiz: [
        {
          q: "¿Cuál es una práctica recomendada al diseñar diapositivas para una exposición en público?",
          o: [
            "Rellenar toda la diapositiva con texto largo para leer en clase",
            "Usar menos texto para que el espectador preste atención al expositor",
            "Utilizar 10 tipos de fuentes e imágenes animadas fosforescentes",
            "No agregar títulos a las páginas para ahorrar espacio"
          ],
          a: "Usar menos texto para que el espectador preste atención al expositor"
        }
      ],
      open: [
        {
          q: "Argumente por qué el uso excesivo de efectos visuales y animaciones desvía la atención del público de los contenidos reales de una presentación escolar."
        }
      ]
    },
    "4": {
      topic: "Ciudadanía Digital, Derechos de Autor y Convivencia Escolar en Red",
      cwWords: ["LICENCIA", "AUTOR", "COPIA", "EDUCACION", "ETICA"],
      cwPistas: [
        "1. Permiso legal para usar una obra intelectual.",
        "2. Creador o responsable original de un contenido.",
        "3. Duplicación no autorizada de archivos (Piratería).",
        "4. Formación y divulgación de valores digitales.",
        "5. Conjunto de directrices morales de conducta."
      ],
      sopaWords: ["PLAGIO", "ETIQUETA", "REGISTRO", "PERMISO", "FIRMA"],
      sopaPistas: [
        "Robar o copiar ideas de otros sin darles crédito.",
        "Reglas de urbanidad en internet (Netiqueta).",
        "Inscripción de marcas o patentes.",
        "Autorización explícita otorgada.",
        "Identidad cifrada o rúbrica de cuenta."
      ],
      quiz: [
        {
          q: "¿Qué significa el término 'Netiqueta' o 'Netiquette'?",
          o: [
            "Comprar ropa de diseñador por internet",
            "Normas éticas y de respeto mutuo al comunicarse en redes y foros digitales",
            "Establecer contraseñas de seguridad complejas",
            "Un protocolo de cableado estructurado para redes LAN"
          ],
          a: "Normas éticas y de respeto mutuo al comunicarse en redes y foros digitales"
        }
      ],
      open: [
        {
          q: "Redacte un breve decálogo de 3 normas fundamentales que debe seguir un buen ciudadano digital para garantizar la sana convivencia en la web."
        }
      ]
    }
  },
  "8": {
    "1": {
      topic: "Fundamentos de Redes de Datos e Infraestructura de Conectividad (LAN, WAN)",
      cwWords: ["LAN", "WAN", "ROUTER", "PROTOCOLOS", "SWITCH"],
      cwPistas: [
        "1. Red de Área Local que conecta equipos en un área confinada.",
        "2. Red de Área Amplia a escala global o nacional.",
        "3. Enrutador que envía paquetes de datos entre distintas redes.",
        "4. Reglas mutuas que los computadores usan para entenderse.",
        "5. Conmutador inteligente de paquetes que une equipos en una LAN."
      ],
      sopaWords: ["CABLE", "CIBER", "FIBRA", "PUERTO", "ANTENA"],
      sopaPistas: [
        "Medio físico de cobre con hilos trenzados.",
        "Espacio de simulación tecnológica en red.",
        "Hebra de vidrio que conduce pulsos de luz.",
        "Zócalo de conexión para cables en el computador.",
        "Dispositivo emisor de ondas electromagnéticas."
      ],
      quiz: [
        {
          q: "¿Cuál de las siguientes es la red que conecta computadores en todo el mundo, como Internet?",
          o: ["Red LAN", "Red PAN", "Red MAN", "Red WAN"],
          a: "Red WAN"
        }
      ],
      open: [
        {
          q: "Explique la diferencia práctica de alcance, hardware y costos entre una Red de Área Local (LAN) de su colegio y la Red WAN administrada por su proveedor de telecomunicaciones."
        }
      ]
    },
    "2": {
      topic: "Fórmulas Intermedias en Hojas de Cálculo (Promedios, Condición SI)",
      cwWords: ["PROMEDIO", "SI", "BUSCAR", "SUMATORIA", "CONDICION"],
      cwPistas: [
        "1. Función que calcula la media aritmética de un rango de valores.",
        "2. Función lógica clave que evalúa una prueba y toma decisiones según el resultado.",
        "3. Función usada para hallar un elemento en una columna específica.",
        "4. Cálculo veloz de la suma total en Excel.",
        "5. Criterio de verificación lógica obligatorio."
      ],
      sopaWords: ["VERDAD", "FALSO", "CONTAR", "FILTRAR", "ORDEN"],
      sopaPistas: [
        "Resultado afirmativo de comprobación lógica.",
        "Resultado negativo de validación de criterio.",
        "Función que cuenta cuántas celdas contienen números.",
        "Cribar los registros de una tabla según un patrón.",
        "Estructura alfabética o numérica incremental."
      ],
      quiz: [
        {
          q: "¿Qué retorna la fórmula '=SI(5>10; \"Es mayor\"; \"Es menor\")' en la hoja de cálculo?",
          o: ["Es mayor", "Es menor", "Error de sintaxis", "FALSO"],
          a: "Es menor"
        }
      ],
      open: [
        {
          q: "Establezca cómo solucionaría de manera matemática una fórmula para obtener el promedio escolar de 4 notas dándole pesos porcentuales diferentes a cada periodo."
        }
      ]
    },
    "3": {
      topic: "Algoritmia, Pseudocódigo y Pensamiento Lógico",
      cwWords: ["ALGORITMO", "PSEUDO", "DIAGRAMA", "VARIABLE", "INICIO"],
      cwPistas: [
        "1. Secuencia de pasos ordenados y lógicos para resolver un problema.",
        "2. Código en lenguaje humano informal intermedio que simula la programación.",
        "3. Representación gráfica de un proceso (Diagrama de Flujo).",
        "4. Contenedor de memoria temporal cuyo valor varía durante la ejecución.",
        "5. El punto obligatorio de arranque de un flujograma o programa."
      ],
      sopaWords: ["FIN", "DECIDIR", "BUCLE", "DATO", "PASO"],
      sopaPistas: [
        "Instrucción de término de un proceso algorítmico.",
        "Elegir un rumbo u otro según una condición.",
        "Ciclo repetitivo que se ejecuta varias veces.",
        "Detalle o entrada numérica ingresada.",
        "Instrucción individual realizada de forma secuencial."
      ],
      quiz: [
        {
          q: "¿Cuáles son las tres etapas lógicas obligatorias en un algoritmo funcional?",
          o: [
            "Inicio, Pantalla y Fin",
            "Internet, Base de datos y HTML",
            "Entrada, Procesamiento de datos y Salida de información",
            "Escribir, Clic y Guardar"
          ],
          a: "Entrada, Procesamiento de datos y Salida de información"
        }
      ],
      open: [
        {
          q: "Diseñe en palabras sencillas el algoritmo estructurado paso a paso que debería seguir un robot de limpieza para salir de una habitación con obstáculos."
        }
      ]
    },
    "4": {
      topic: "Creación de Blogs Escolares y Editores Web Wix, Blogger",
      cwWords: ["BLOGGER", "POST", "PLANTILLA", "DOMINIO", "BANNER"],
      cwPistas: [
        "1. Plataforma histórica de Google para publicar diarios web.",
        "2. Publicación o artículo secuencial subido a una página.",
        "3. Estructura visual precargada regulable.",
        "4. Nombre o dirección web única (Ej. mi-escuela.com).",
        "5. Imagen o cabecera decorativa principal."
      ],
      sopaWords: ["AUTOR", "COMENTO", "WIDGET", "GADGET", "VISITA"],
      sopaPistas: [
        "Escribiente del blog en línea.",
        "Opinión dejada por un lector en la entrada del blog.",
        "Pequeño accesorio informativo interactivo.",
        "Componente secundario añadido al diseño del blog.",
        "Contador digital para rastrear visitantes."
      ],
      quiz: [
        {
          q: "¿Qué diferencia un Blog de una página web corporativa tradicional?",
          o: [
            "Un blog es privado y no permite el acceso del público",
            "Un blog está estructurado por publicaciones cronológicas inversas y permite comentarios",
            "Un blog no requiere el uso de servidores web o internet",
            "Un blog es exclusivo para técnicos de programación"
          ],
          a: "Un blog está estructurado por publicaciones cronológicas inversas y permite comentarios"
        }
      ],
      open: [
        {
          q: "Justifique qué temas de la vida estudiantil podrían beneficiarse del uso de un blog de opinión y cómo moderaría los comentarios ofensivos de la audiencia."
        }
      ]
    }
  },
  "9": {
    "1": {
      topic: "Programación en Bloques Avanzada, Manejo de Escenarios y Variables",
      cwWords: ["SCRATCH", "BUCLE", "CONDICIONES", "PERSONAJE", "VARIABLES"],
      cwPistas: [
        "1. Entorno didáctico icónico de programación visual con bloques encajables.",
        "2. Estructura que repite bloques de órdenes mientras se cumpla un criterio.",
        "3. Estructuras Condicionales Si-Entonces que bifurcan el flujo.",
        "4. Elemento que posee disfraces y ejecuta scripts en el escenario.",
        "5. Contenedores de valores asignados con nombres lógicos dentro del juego."
      ],
      sopaWords: ["FONDO", "SONIDO", "PULSAR", "DIBUJO", "COORDEN"],
      sopaPistas: [
        "Escenarios pictóricos de detrás de escena.",
        "Efectos acústicos incidentales anexados.",
        "Acción de cliquear sobre un sprite.",
        "Gráficos vectoriales moldeados por el estudiante.",
        "Coordenadas X, Y cartesianas de movimiento sobre el plano."
      ],
      quiz: [
        {
          q: "En entornos de programación como Scratch, ¿qué coordenada controla el movimiento en sentido vertical?",
          o: ["Coordenada X", "Coordenada Y", "Coordenada Z", "Coordenada W"],
          a: "Coordenada Y"
        }
      ],
      open: [
        {
          q: "Escriba un fragmento de lógica para explicar la importancia de usar bucles 'Repetir hasta que...' en vez de duplicar bloques de instrucciones idénticos repetidas veces."
        }
      ]
    },
    "2": {
      topic: "Bases de Datos Conceptuales, Definición de Tablas y Registros",
      cwWords: ["TABLAS", "REGISTRO", "CAMPO", "LLAVE", "CONSULTA"],
      cwPistas: [
        "1. Estructura bidimensional donde se guardan datos ordenadamente.",
        "2. Fila única que representa un objeto con sus atributos.",
        "3. Columna única que representa un tipo específico de información.",
        "4. Clave única indispensable (Primary Key) que no se duplica.",
        "5. Solicitud de búsqueda de datos que cumplen criterios específicos."
      ],
      sopaWords: ["BASE", "DATOS", "SQL", "ORDEN", "MOTOR"],
      sopaPistas: [
        "Contenedor robusto persistente del sistema de archivos.",
        "Unidades mínimas de información estructurada.",
        "Lenguaje estructurado de consultas estandarizado.",
        "Clasificar de menor a mayor los resultados.",
        "Sistema que administra y recupera los datos de tablas."
      ],
      quiz: [
        {
          q: "En una base de datos escolar, ¿cuál de los siguientes datos es el mejor candidato para ser Llave Primaria (Primary Key)?",
          o: [
            "Nombres del estudiante",
            "Código único de matrícula o ID",
            "Fecha exacta de nacimiento",
            "Grado escolar actual"
          ],
          a: "Código único de matrícula o ID"
        }
      ],
      open: [
        {
          q: "Señale la diferencia conceptual entre una Base de Datos y una simple Hoja de Cálculo para gestionar la contabilidad global de un hospital estatal."
        }
      ]
    },
    "3": {
      topic: "Introducción a la Robótica, Servomotores y Sensores",
      cwWords: ["SENSORES", "MOTORES", "PROCESO", "CIRCUITO", "PLACA"],
      cwPistas: [
        "1. Dispositivos que miden el entorno (luz, calor, proximidad).",
        "2. Actuadores mecánicos que convierten energía eléctrica en movimiento.",
        "3. Ciclo automático programado de control de variables.",
        "4. Camino de pistas de cobre donde fluyen electrones.",
        "5. Plaqueta central lógica controladora (como Arduino, Microbit)."
      ],
      sopaWords: ["LED", "SWITCH", "PILA", "CABLE", "RELE"],
      sopaPistas: [
        "Diodo luminoso de bajísimo consumo de energía.",
        "Interruptor manual de circuito de corriente.",
        "Batería o unidad química de voltaje continuo.",
        "Filamento metálico que conduce electrones.",
        "Relevador o interruptor regulado por electromagnetismo."
      ],
      quiz: [
        {
          q: "¿Qué tipo de sensor utilizaría en su robot seguidor de línea para detectar el contraste entre el color blanco del piso y el negro de la pista?",
          o: [
            "Sensor de Ultra Sonido",
            "Sensor Infrarrojo de Luz",
            "Sensor de Temperatura",
            "Sensor de Humedad y Presión"
          ],
          a: "Sensor Infrarrojo de Luz"
        }
      ],
      open: [
        {
          q: "Describa la función de los actuadores en robótica industrial y escriba un ejemplo real de cómo operan en una planta de ensamblaje de carros."
        }
      ]
    },
    "4": {
      topic: "Desarrollo Tecnológico Sostenible, Ecología Digital y Reciclaje",
      cwWords: ["RECI_CLADO", "DESECHO", "SOSTENI", "PILAS", "QUIMICO"], // adjusted to fit beautifully
      cwPistas: [
        "1. Destinar residuos electrónicos a fines industriales nuevos.",
        "2. Basura de chatarra informática (E-waste) peligrosa.",
        "3. Crecimiento balanceado sin perjudicar el ecosistema mundial.",
        "4. Celdas de energía que acumulan metales altamente contaminantes.",
        "5. Elementos tóxicos presentes en semiconductores y placas."
      ],
      sopaWords: ["PLOMO", "COBRE", "VIDRIO", "METAL", "VERDE"],
      sopaPistas: [
        "Metal pesado altamente tóxico usado en soldaduras viejas.",
        "Metal dúctil conductor hallado en cables internos.",
        "Material de pantallas frágiles inertes.",
        "Aleación de estructuras externas y soportes metálicos.",
        "Enfoque tecnológico ecológico que favorece el entorno."
      ],
      quiz: [
        {
          q: "¿Por qué los computadores viejos no deben tirarse al camión de basura común?",
          o: [
            "Porque ocupan mucho espacio en las bolsas",
            "Porque contienen metales pesados como plomo y mercurio que envenenan la tierra si se rompen",
            "Porque pueden causar explosiones con fuego",
            "Porque todavía valen millones de pesos"
          ],
          a: "Porque contienen metales pesados como plomo y mercurio que envenenan la tierra si se rompen"
        }
      ],
      open: [
        {
          q: "Proponga una estrategia escolar viable para recopilar baterías secas, celulares antiguos y cables rotos del alumnado para su tratamiento ecológico."
        }
      ]
    }
  },
  "10": {
    "1": {
      topic: "Modelo de Red OSI y Protocolos Fundamentales de Internet (TCP/IP, DNS, IP)",
      cwWords: ["PROTOCOLOS", "DNS", "PAQUETES", "HOST", "INTERNET"],
      cwPistas: [
        "1. Lenguaje de convenciones mutuas de transmisión de datos.",
        "2. Sistema que traduce nombres de dominio legibles a direcciones IP numéricas.",
        "3. Fracciones de datos numerados en los que se divide un flujo web.",
        "4. Servidor del plano con dirección o nodo activo.",
        "5. Red lógica descentralizada robusta."
      ],
      sopaWords: ["PUERTO", "REDIRE_C", "FIBRA", "MARGEN", "CANAL"],
      sopaPistas: [
        "Enlace numérico virtual de salida de servicios (como puerto 80).",
        "Redirección del tráfico web.",
        "Conducto velocísimo de cristal de luz.",
        "Límite o campo asignado del enrutamiento de red.",
        "Medio electromagnético de envío de frecuencias."
      ],
      quiz: [
        {
          q: "¿Cuál es la función del protocolo DNS en Internet?",
          o: [
            "Garantizar la encriptación de claves bancarias",
            "Traducir nombres como 'escuela.edu' a direcciones IP numéricas",
            "Permitir la descarga de archivos pesados",
            "Medir el voltaje en redes eléctricas"
          ],
          a: "Traducir nombres como 'escuela.edu' a direcciones IP numéricas"
        }
      ],
      open: [
        {
          q: "Dibuje o explique paso a paso qué ocurre desde que escribe 'google.com' en su navegador hasta que la página se despliega exactamente en su monitor."
        }
      ]
    },
    "2": {
      topic: "Pensamiento Computacional: Tipos de Datos, Estructuras y Variables",
      cwWords: ["VARIABLES", "FLOAT", "STRING", "BOOLEANO", "FUNCION"],
      cwPistas: [
        "1. Contenedor de datos renombrado regulable.",
        "2. Tipo de dato de coma flotante usado para números decimales.",
        "3. Tipo de dato interactivo compuesto de caracteres de texto literal.",
        "4. Tipo de dato lógico que únicamente guarda Verdadero o Falso.",
        "5. Bloque reutilizable que ejecuta un proceso específico."
      ],
      sopaWords: ["CLASE", "OBJETO", "ENTERO", "MATRIZ", "CICLO"],
      sopaPistas: [
        "Molde o plano formal programático.",
        "Instancia creada mediante una clase estructurada.",
        "Tipo numérico sin decimales (Integer).",
        "Estructura array de múltiples dimensiones de valores.",
        "Bucle repetitivo de control (Instrucción for, while)."
      ],
      quiz: [
        {
          q: "¿Cuál tipo de variable sería ideal para guardar el promedio de notas escolares de este periodo?",
          o: ["Boolean", "String", "Float (o Double)", "Char"],
          a: "Float (o Double)"
        }
      ],
      open: [
        {
          q: "Explique la importancia de usar funciones con parámetros para estructurar un software de facturación escolar y evitar duplicación de código."
        }
      ]
    },
    "3": {
      topic: "Bases de Datos Relacionales y Fundamentos del Lenguaje SQL",
      cwWords: ["SELECT", "FROM", "WHERE", "UPDATE", "INSERT"],
      cwPistas: [
        "1. Comando SQL para consultar o extraer columnas de una tabla.",
        "2. Instrucción SQL para indicar de cuál tabla provienen los datos.",
        "3. Comando SQL de filtrado que introduce cláusulas restrictivas.",
        "4. Sentencia SQL para modificar datos ya guardados.",
        "5. Sentencia SQL para agregar nuevos registros a una tabla."
      ],
      sopaWords: ["JOIN", "INDEX", "CLAVE", "TABLA", "VISTA"],
      sopaPistas: [
        "Vínculo relacional para combinar datos de dos tablas.",
        "Índice optimizador que agiliza búsquedas.",
        "Atributo determinante de relación única (Key).",
        "Estructura de grilla y campos organizada.",
        "Consulta compleja pre-guardada accesible como tabla."
      ],
      quiz: [
        {
          q: "¿Qué consulta SQL extrae todos los datos de la planilla de alumnos?",
          o: [
            "GET ALL FROM alumnos",
            "SELECT * FROM alumnos",
            "EXTRACT * IN alumnos",
            "SELECT ALL campos IN alumnos"
          ],
          a: "SELECT * FROM alumnos"
        }
      ],
      open: [
        {
          q: "Justifique exhaustivamente por qué las bases de datos relacionales superan a los archivos de texto planos al manejar millones de registros financieros en la banca."
        }
      ]
    },
    "4": {
      topic: "El Internet de las Cosas (IoT), Redes Domésticas y Ciudades Inteligentes",
      cwWords: ["DOMOTICA", "SENSORES", "WIFI", "INTELIGE", "NODO"],
      cwPistas: [
        "1. Automatización inteligente de viviendas y hogares conectados.",
        "2. Dispositivos físicos que leen parámetros naturales de variables.",
        "3. Conexión inalámbrica veloz por radiofrecuencia doméstica.",
        "4. Capacidad reactiva computada automatizada.",
        "5. Punto de enlace o enrutamiento de un sistema en malla."
      ],
      sopaWords: ["LUNA", "SMART", "MALLA", "IP", "FUEGO"],
      sopaPistas: [
        "Energía solar recogida de celdas.",
        "Dispositivo catalogado como inteligente.",
        "Red interconectada descentralizada.",
        "Dirección indispensable de red única de dispositivo.",
        "Seguridad de intrusión perimetral en red."
      ],
      quiz: [
        {
          q: "¿Cuál es el propósito central de la Domótica?",
          o: [
            "Crear mejores procesadores de computadores",
            "Diseñar software de diseño gráfico avanzado",
            "Automatizar e integrar sistemas inteligentes en viviendas (luces, seguridad, clima)",
            "Hacer llamadas por satélite"
          ],
          a: "Automatizar e integrar sistemas inteligentes en viviendas (luces, seguridad, clima)"
        }
      ],
      open: [
        {
          q: "Escriba un concepto analítico sobre los riesgos de privacidad que supone tener las cerraduras, cámaras y neveras de su hogar expuestas a Internet las 24 horas del día."
        }
      ]
    }
  },
  "11": {
    "1": {
      topic: "Estructuras de Maquetación Web: HTML y Estilos CSS Cascading",
      cwWords: ["ETIQUETA", "CSS", "BODY", "HEADER", "ESTILOS"],
      cwPistas: [
        "1. Objeto de marcado XML clave de encierre (Ej. <div>, <p>).",
        "2. Hoja de estilo en cascada que asigne diseño y formas visuales.",
        "3. Sección del HTML visible que compone el cuerpo principal del sitio.",
        "4. Bloque superior de la cabecera de la plantilla del portal.",
        "5. Atributos cosméticos decorativos que componen un layout."
      ],
      sopaWords: ["ENLACE", "DIV", "TABLA", "COLOR", "FUENTE"],
      sopaPistas: [
        "Vínculo de redirección web hipertexto (<a>).",
        "Contenedor lógico divisorio básico HTML.",
        "Grilla tabular de filas y columnas ordenada.",
        "Tonalidad cromática aplicada a fondos y textos.",
        "Familia tipográfica cargada por el navegador."
      ],
      quiz: [
        {
          q: "¿Qué significa la sigla HTML en el desarrollo web universal?",
          o: [
            "HyperText Markup Language (Lenguaje de Marcado de Hipertexto)",
            "High Technology Markup Language",
            "Hyper Media Transfer Layout",
            "Host Terminal Main Link"
          ],
          a: "HyperText Markup Language (Lenguaje de Marcado de Hipertexto)"
        }
      ],
      open: [
        {
          q: "Diferencie el rol que juega el lenguaje HTML frente a las hojas de estilo CSS en el ciclo de diseño y desarrollo de una plataforma web interactiva moderna."
        }
      ]
    },
    "2": {
      topic: "Fundamentos de la Inteligencia Artificial Científica e Introducción al Aprendizaje Automatizado",
      cwWords: ["M_LEARNING", "RED_NEURO", "DATOS", "ALGORIT", "ENTRENA"],
      cwPistas: [
        "1. Machine Learning o Aprendizaje Automático basado en entrenamiento estadístico.",
        "2. Redes Neuronales Artificiales inspiradas en la conectividad sináptica cerebral.",
        "3. Conjunto masivo de registros empíricos necesarios para procesar (Big Data).",
        "4. Modelos lógicos matemáticos que guían el aprendizaje.",
        "5. Suministrar datos históricos a un modelo para que aprenda patrones."
      ],
      sopaWords: ["IA", "CHAT", "BOT", "BIAS", "PESO"],
      sopaPistas: [
        "Sigla formal de Inteligencia Artificial.",
        "Canal interactivo conversacional automatizado.",
        "Asistente programado que responde pautas de usuarios.",
        "Sesgo o desvío indeseado en la predicción del modelo.",
        "Factor de ajuste sináptico de cálculo de red neuronal."
      ],
      quiz: [
        {
          q: "¿De qué requiere primordialmente un modelo de Machine Learning para volverse preciso al predecir patrones?",
          o: [
            "De un procesador de texto de última gama",
            "De una cantidad masiva de datos limpios para entrenarse",
            "De una conexión veloz por satélite",
            "De un programador que digite cada acción de forma manual e individual"
          ],
          a: "De una cantidad masiva de datos limpios para entrenarse"
        }
      ],
      open: [
        {
          q: "Argumente exhaustivamente sobre las preocupaciones éticas que giran en torno al uso de la Inteligencia Artificial y la posible automatización de empleos humanos."
        }
      ]
    },
    "3": {
      topic: "Principios de Ciberseguridad, Encriptación y Amenazas Digitales",
      cwWords: ["CIFRADO", "MALWARE", "PHISHING", "FIRMA", "CLAVES"],
      cwPistas: [
        "1. Encriptación matemática para volver ilegibles datos sin clave.",
        "2. Software dañino diseñado para sabotear u obtener información privada.",
        "3. Suplantación de portales legítimos para robar credenciales escolares o bancarias.",
        "4. Rúbrica digital segura que valida la autoría e integridad del emisor.",
        "5. Contraseñas de alta complejidad para regular resguardos."
      ],
      sopaWords: ["VIRUS", "SPAM", "HACKER", "CLAVE", "ROBO"],
      sopaPistas: [
        "Código hostil autorreplicable que destruye archivos locales.",
        "Buzón de spam promocional inofensivo masivo.",
        "Experto en seguridad que evalúa códigos y sistemas vulnerables.",
        "Token de seguridad digital secreto.",
        "Extracción ilegal de registros de bases de datos de la red."
      ],
      quiz: [
        {
          q: "¿Qué técnica de ataque informático simula el envío de un correo de su banco para robarle la clave secreta?",
          o: ["Ataque DDoS", "Ataque Phishing", "Inyección SQL", "Fuerza Bruta"],
          a: "Ataque Phishing"
        }
      ],
      open: [
        {
          q: "Explique la diferencia entre encriptación simétrica y asimétrica y por qué la encriptación de datos es crucial en las transacciones bancarias mundiales por internet."
        }
      ]
    },
    "4": {
      topic: "Ingeniería de Requerimientos y Formulación de Proyectos Tecnológicos Escolares",
      cwWords: ["PROYECTOS", "DISEÑO", "ANALISIS", "PLANILLA", "ETAPAS"],
      cwPistas: [
        "1. Iniciativas estructuradas para resolver problemas mediante la innovación.",
        "2. Fase creativa donde se modela la interfaz gráfica y arquitectura técnica.",
        "3. Estudio riguroso de necesidades o requisitos planteados.",
        "4. Organización metódica de tareas y tiempos asignados.",
        "5. Ciclos secuenciales para finalizar una obra (Planificación, Ejecución, Cierre)."
      ],
      sopaWords: ["PLANO", "METAS", "GANTT", "COSTOS", "RIESGO"],
      sopaPistas: [
        "Boceto técnico esquemático estructural elaborado.",
        "Objetivos claros trazados con el cliente del software.",
        "Diagrama de barras horizontales que mide el avance en el tiempo.",
        "Presupuesto de inversión en materiales y horas de trabajo.",
        "Amenazas potenciales que pueden demorar la entrega de la solución."
      ],
      quiz: [
        {
          q: "¿Qué mide específicamente un Diagrama de Gantt en el ciclo administrativo de un proyecto de programación?",
          o: [
            "La velocidad del procesador ejecutando código",
            "La distribución temporal de las tareas y el cronograma de actividades",
            "El consumo presupuestario de repuestos electrónicos",
            "La cantidad de líneas de código generadas al día"
          ],
          a: "La distribución temporal de las tareas y el cronograma de actividades"
        }
      ],
      open: [
        {
          q: "Proponga brevemente una idea innovadora de proyecto de software que resuelva una necesidad administrativa directa de la secretaría de su propio colegio."
        }
      ]
    }
  }
};

import { supplementalDB } from "./supplementalData";

export const academicDB: Record<GradeKey, Record<PeriodKey, AcademicPeriodData>> = (() => {
  const merged: Record<GradeKey, Record<PeriodKey, AcademicPeriodData>> = {} as any;
  
  (Object.keys(rawAcademicDB) as GradeKey[]).forEach((grade) => {
    merged[grade] = {} as any;
    (Object.keys(rawAcademicDB[grade]) as PeriodKey[]).forEach((period) => {
      const base = rawAcademicDB[grade][period];
      const supp = supplementalDB[grade]?.[period];
      
      const combinedCwWords: string[] = [];
      const combinedCwPistas: string[] = [];
      const combinedSopaWords: string[] = [];
      const combinedSopaPistas: string[] = [];
      
      // Add base words first, skipping duplicates (case-insensitive)
      base.cwWords.forEach((word, idx) => {
        const upper = word.toUpperCase().trim();
        if (upper && !combinedCwWords.includes(upper)) {
          combinedCwWords.push(upper);
          combinedCwPistas.push(base.cwPistas[idx]);
        }
      });
      
      // Append supplemental words to reach exactly 10 crossword concepts
      if (supp) {
        supp.cwWords.forEach((word, idx) => {
          const upper = word.toUpperCase().trim();
          if (upper && !combinedCwWords.includes(upper) && combinedCwWords.length < 10) {
            combinedCwWords.push(upper);
            combinedCwPistas.push(supp.cwPistas[idx]);
          }
        });
      }
      
      // Add base word search words
      base.sopaWords.forEach((word, idx) => {
        const upper = word.toUpperCase().trim();
        if (upper && !combinedSopaWords.includes(upper)) {
          combinedSopaWords.push(upper);
          combinedSopaPistas.push(base.sopaPistas[idx]);
        }
      });
      
      // Append supplemental word search words to reach exactly 10 concepts
      if (supp) {
        supp.sopaWords.forEach((word, idx) => {
          const upper = word.toUpperCase().trim();
          if (upper && !combinedSopaWords.includes(upper) && combinedSopaWords.length < 10) {
            combinedSopaWords.push(upper);
            combinedSopaPistas.push(supp.sopaPistas[idx]);
          }
        });
      }
      
      merged[grade][period] = {
        ...base,
        cwWords: combinedCwWords,
        cwPistas: combinedCwPistas,
        sopaWords: combinedSopaWords,
        sopaPistas: combinedSopaPistas
      };
    });
  });
  
  return merged;
})();
