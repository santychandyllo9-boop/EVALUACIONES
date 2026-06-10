/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GradeKey, PeriodKey } from "./types";

export interface TrueFalseQuestion {
  q: string;
  a: boolean;
}

export const trueFalseQuestions: Record<GradeKey, Record<PeriodKey, TrueFalseQuestion[]>> = {
  "6": {
    "1": [
      { q: "El teclado y el micrófono son considerados exclusivamente periféricos de salida.", a: false },
      { q: "La memoria RAM borra toda su información de ejecución de forma temporal al apagarse la computadora.", a: true },
      { q: "El procesador o CPU realiza todas las operaciones lógicas y matemáticas del computador.", a: true }
    ],
    "2": [
      { q: "Windows, Linux y macOS son ejemplos populares de Sistemas Operativos.", a: true },
      { q: "Una carpeta digital sólo puede albergar archivos, pero nunca subcarpetas en su interior.", a: false },
      { q: "La interfaz gráfica (GUI) utiliza iconos, ventanas y punteros para facilitar la interacción del usuario.", a: true }
    ],
    "3": [
      { q: "El tamaño y tipo de letra en un procesador de texto se modifican a través del menú de formato de fuente.", a: true },
      { q: "La alineación justificada reparte el texto en líneas uniformes pegadas a ambos márgenes del papel.", a: true },
      { q: "Es imposible añadir tablas gráficas directamente dentro de un documento de Word.", a: false }
    ],
    "4": [
      { q: "El protocolo 'https' en las direcciones web nos indica un canal de transmisión cifrado y más seguro.", a: true },
      { q: "El término 'SPAM' hace referencia exclusivamente a correos electrónicos deseados de familiares.", a: false },
      { q: "Navegar de manera anónima de incógnito impide que proveedores externos registren cualquier dato de red.", a: false }
    ]
  },
  "7": {
    "1": [
      { q: "El ábaco representó históricamente uno de los primeros instrumentos físicos creados para computar cifras.", a: true },
      { q: "Los transistores electrónicos redujeron drásticamente el calor y tamaño de los computadores en comparación con las válvulas de vacío.", a: true },
      { q: "Un servicio o almacenamiento en la nube no requiere de servidores físicos reales funcionando en ningún lugar del planeta.", a: false }
    ],
    "2": [
      { q: "Un rango en hojas de cálculo comprende un conjunto seleccionado de celdas continuas o adyacentes.", a: true },
      { q: "Las columnas en las hojas de cálculo se sitúan de forma horizontal e indican marcas numéricas de control.", a: false },
      { q: "La celda C4 representa matemáticamente la intersección entre la columna C y la fila número 4.", a: true }
    ],
    "3": [
      { q: "Una diapositiva escolar exitosa debe contener la mayor cantidad posible de texto copiado para leer directamente en la exposición.", a: false },
      { q: "Las transiciones son efectos visuales aplicados de fondo al pasar de una diapositiva a la siguiente en el proyector.", a: true },
      { q: "Los hipervínculos multimedia en la presentación permiten desviar y saltar a páginas externas durante el transcurso de la exposición.", a: true }
    ],
    "4": [
      { q: "La piratería de software vulnera de lleno los derechos legítimos de autor e infringe las leyes de propiedad intelectual.", a: true },
      { q: "La Netiqueta es un conjunto de reglas que nos enseña a debatir con decoro, tolerancia y respeto en medios comunitarios web de internet.", a: true },
      { q: "El plagio académico en internet consiste en referenciar correctamente el blog de un compañero dándole los respectivos créditos.", a: false }
    ]
  },
  "8": {
    "1": [
      { q: "Una red LAN cubre amplias distancias geográficas operando continentes completos simultáneamente.", a: false },
      { q: "El enrutador o router tiene la capacidad de interconectar redes separadas enviando tráficos lógicos.", a: true },
      { q: "La fibra óptica conduce pulsos de luz para transmitir datos de forma extremadamente rápida sin pérdidas por ondas electromagnéticas.", a: true }
    ],
    "2": [
      { q: "La función lógica condicional SI puede ejecutar una de dos respuestas según resulte aprobatoria o no una prueba lógica.", a: true },
      { q: "La fórmula '=SUMA(A1:A5)' calculará el promedio ponderado del rango seleccionado.", a: false },
      { q: "La herramienta Filtros de Excel reordena toda la tabla alfabéticamente pero impide ocultar registros.", a: false }
    ],
    "3": [
      { q: "Un algoritmo informático debe contener instrucciones confusas infinitas para que la máquina no deje de trabajar.", a: false },
      { q: "El pseudocódigo es útil para estructurar la solución de un problema lógicamente antes de traducirla a un lenguaje formal de programación.", a: true },
      { q: "Un diagrama de flujo utiliza símbolos gráficos específicos como rombos para representar la toma de decisiones lógicas de selección.", a: true }
    ],
    "4": [
      { q: "Un blog en internet actualiza sus envíos de forma cronológica inversa, mostrando siempre el post escolar más reciente de primero.", a: true },
      { q: "Los widgets son herramientas de adorno estático obligatorias de diseño que impiden interacciones dinámicas del lector.", a: false },
      { q: "El dominio es la dirección lógica legible usada en navegadores para ubicar un sitio sin recordar complejas direcciones IP físicas.", a: true }
    ]
  },
  "9": {
    "1": [
      { q: "Scratch se caracteriza por ser un lenguaje textual donde el alumno digita comandos línea tras línea usando sintaxis estricta.", a: false },
      { q: "El bloque condicional 'si... entonces' nos permite bifurcar y realizar decisiones lógicas en nuestro videojuego.", a: true },
      { q: "Las variables sirven para acumular y cambiar datos dinámicos durante el juego, como los puntos recolectados.", a: true }
    ],
    "2": [
      { q: "Una llave primaria (Primary Key) admite valores duplicados o vacíos a fin de facilitar relaciones con otras tablas.", a: false },
      { q: "Los registros constituyen las filas de una tabla escolar, mientras que los campos configuran las columnas respectivas de atributos.", a: true },
      { q: "Una consulta selectiva tiene por finalidad exclusiva modificar o corromper datos guardados en el disco duro.", a: false }
    ],
    "3": [
      { q: "Un sensor infrarrojo de proximidad permite medir distancias emitiendo luz y recibiendo su respectivo reflejo físico.", a: true },
      { q: "Los servomotores controlan de forma exacta la posición de giro angular del eje de rotación.", a: true },
      { q: "La microcontroladora Arduino es puramente software y no requiere de componentes de hardware para operar motores en el aula.", a: false }
    ],
    "4": [
      { q: "La chatarra electrónica (E-waste) contiene peligrosos componentes pesados como plomo, cadmio y mercurio.", a: true },
      { q: "Las baterías de litio y acumuladores contaminan gravemente acuíferos de agua potable si se desechan de forma ordinaria en basureros.", a: true },
      { q: "La tecnología sostenible aconseja el desecho inmediato de ordenadores de forma constante cada semestre.", a: false }
    ]
  },
  "10": {
    "1": [
      { q: "El modelo de capas OSI consta exclusivamente de dos capas físicas de transmisión eléctrica.", a: false },
      { q: "Un servidor DNS traduce direcciones humanas lógicas como 'colegio.edu.co' a direcciones de numeración IP de red.", a: true },
      { q: "El enrutamiento por paquetes descompone un documento en fragmentos numerados que viajan por distintos caminos sobre internet.", a: true }
    ],
    "2": [
      { q: "Las variables de tipo 'string' almacenan flujos literales de texto encerrados con caracteres o comillas.", a: true },
      { q: "Un tipo de datos Booleano almacena cualquier número entero comprendido entre cero y un millón.", a: false },
      { q: "Una función es un fragmento reutilizable de programación que puede recibir parámetros y opcionalmente retornar valores.", a: true }
    ],
    "3": [
      { q: "La instrucción SQL UPDATE modifica valores ya existentes de forma ordenada en los registros de una tabla.", a: true },
      { q: "La sentencia SELECT del dialecto SQL permite insertar nuevos datos de alumnos directamente en las tablas.", a: false },
      { q: "El comando relacional 'JOIN' acopla filas de tablas basándose en un atributo o campo común llave vinculante.", a: true }
    ],
    "4": [
      { q: "La Domótica regula de forma computarizada y remota la climatización, iluminación y accesibilidad de los hogares.", a: true },
      { q: "En el Internet de las Cosas (IoT), los aparatos caseros se desconectan de toda red a fin de limitar interferencias de radio.", a: false },
      { q: "Tener dispositivos inteligentes del IoT abre brechas de seguridad y ciberataques contra nuestra red local si no se protege la red.", a: true }
    ]
  },
  "11": {
    "1": [
      { q: "El código HTML representa el diseño visual estético y las transiciones animadas de las pantallas de navegación.", a: false },
      { q: "La etiqueta estructural '<body>' encierra la totalidad del contenido del documento web visible en pantalla.", a: true },
      { q: "Las hojas de estilo en cascada (CSS) le otorgan fuentes, posicionamientos atractivos, márgenes y color a los sitios maquetados.", a: true }
    ],
    "2": [
      { q: "El Machine Learning requiere entrenamientos reiterados basados en sets de datos e históricos para optimizar sus predicciones.", a: true },
      { q: "Las redes neuronales artificiales funcionan mediante capas compuestas por nodos que emulan el procesamiento sináptico cerebral.", a: true },
      { q: "Los sesgos en modelos de Inteligencia Artificial proceden exclusivamente de problemas mágicos sin ninguna relación con datos sesgados humanos de entrenamiento.", a: false }
    ],
    "3": [
      { q: "El Phishing es un ataque de ingeniería social que mediante engaños remite un clon de portal web para hurtar claves personales.", a: true },
      { q: "La encriptación simétrica utiliza dos llaves distintas separadas (una llave pública para encriptar y otra privada para desencriptar).", a: false },
      { q: "Un malware Ransomware secuestra los archivos de la máquina local cifrándolos y exigiendo un rescate monetario virtual.", a: true }
    ],
    "4": [
      { q: "Un diagrama de Gantt es un valioso cronograma para ordenar y rastrear el avance temporalizado de las fases del proyecto tecnológico.", a: true },
      { q: "El análisis de requerimientos extrae los requerimientos precisos que debe satisfacer la solución de software de cara al cliente.", a: true },
      { q: "La fase de diseño técnico carece de valor al crear software, ya que es recomendable iniciar la digitación de código sin planeación alguna.", a: false }
    ]
  }
};
