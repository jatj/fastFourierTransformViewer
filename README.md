# Fast Fourier Transform

Es un algoritmo eficiente que permite calcular la transformada de Fourier discreta (DFT) y su inversa. Se le puede dar varios usos desde tratamiento digital de señales y filtrado digital. En una manera muy simple la transformada rápida de Fourier, descompone una señal en sus componentes de frecuencia, como se puede observar en la siguiente imagen.

![Ilustración FFT](./res/fft_visual.png)

La idea principal de FFT esta definida por las siguientes metáforas:
- Qué es lo que hace la Transformada de Fourier? Dado un licuado, encuentra la receta (lista de ingredientes que lo conforman).
- Cómo? Pasar el licuado a traves de filtros para extraer cada ingrediente.
- Por qué? Las recetas son más faciles de analisar comparar y modificar que el licuado en sí.
- Cómo obtengo el licuado de nuevo? Mezclando todos los ingredientes.

FFT emplea números complejos para poder computar la transformada de Fourier, debido a que los numeros complejos tienen propiedades que facilitan el calculo de la transformada de Fourier. Un número complejo se descompone de una parte real y otra imaginaria los que vienen representando las dos dimensiones de la señal de entrada. La transformada de Fourier esta definida por la siguiente ecuación.

![Formula FFT](./res/formula.svg)


## Demo

El proyecto consta de dos demos los cuales demuestran como funciona la transformada rápida de Fourier (FFT) de una manera interactiva:
- Drawer: Consta de una interfaz gráfica en la que se puede dibujar una señal a procesar con FFT, la cual se verá reflejada en la gráfica de las frecuencias obtenidas por el procesamiento de FFT. Haz click [aquí](https://fftdemo.web.app/drawer.html) para ver el demo de FFT drawer.
- Listener: Consta de un visualizador de audio, en el cual se puede reproducir un audio el cual es analizado por FFT en tiempo real y se grafican las frecuencias. Haz click [aquí](https://fftdemo.web.app) para ver el demo de FFT listener.

## Implementación:
El proyecto fue desarrollado para ser visualizado como una aplicación web. Para esto se utilizo [P5js](https://p5js.org/) para poder visualizar las graficas. Se utilizo javascript y la implementación de FFT que se encuentra [implementada](https://p5js.org/reference/#/p5.FFT) dentro de P5 js para el analisis de audio del demo _Listener_. Para el demo _Drawer_ se utilizó la implementación de FFT en el siguiente [repositorio](https://p5js.org/reference/#/p5.FFT).


## Referencias:
- [Explicación de FFT](https://dev.to/trekhleb/playing-with-discrete-fourier-transform-algorithm-in-javascript-53n5)
- [Implementación de FFT](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/math/fourier-transform)
- [Video explicativo](https://www.youtube.com/watch?v=spUNpyF58BY)