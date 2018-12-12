function first_step(list, which = '') {
    // Pone el paso en cero y prende los nodos que estan hablando.

    if (list.length == 0) {
        document.getElementById('details' + which).innerHTML = "No se encontraron resultados " +  
                                                                "para esa b&uacutesqueda.";
    } else {
        // Resetea el paso y la vista. 
        step = 0;
        document.getElementById('div_next' + which).hidden = false;
        document.getElementById('div_prev' + which).hidden = true;

        // Actualiza nodos prendidos. 
        refresh_active_nodes(step);

		// Actualiza enlace delegado. 
		update_delegate_link(list[step]);

        // Obtiene el detalle de la llamada del paso actual. 
        get_call_details(list[step], 'details' + which);

        // Obtiene el listado total de llamadas. 
        get_calls_list(list, which);
        document.getElementById('div_calls_list' + which).hidden = false;

        // Sincroniza el elemento de la lista con el paso. 
        document.getElementById('select_calls' + which).selectedIndex = step;
    }
}

function next_step(list, which = '') {
    // Incrementa el paso y prende los nodos que estan hablando.

    // Actualiza el paso y la vista. 
    if (step < list.length - 1) {
        step++;
        document.getElementById('div_prev' + which).hidden = false;
        if (step == list.length - 1) {
            document.getElementById('div_next' + which).hidden = true;
        }
    }

    // Actualiza nodos prendidos.
    refresh_active_nodes(step);

    // Actualiza enlace delegado. 
	update_delegate_link(list[step]);

    // Obtiene el detalle de la llamada del paso actual. 
    get_call_details(list[step], 'details' + which);

    // Sincroniza el elemento de la lista con el paso. 
    document.getElementById('select_calls' + which).selectedIndex = step;
}

function previous_step(list, which = '') {
    // Decrementa el paso y prende los nodos que estan hablando.

    // Actualiza el paso y la vista. 
    if (step > 0) {
        step--;
        document.getElementById('div_next' + which).hidden = false;
        if (step == 0) 
            document.getElementById('div_prev' + which).hidden = true;
    }

    // Actualiza nodos prendidos.
    refresh_active_nodes(step);

    // Actualiza enlace delegado. 
	update_delegate_link(list[step]);

    // Obtiene el detalle de la llamada del paso actual.
    get_call_details(list[step], 'details' + which);

    // Sincroniza el elemento de la lista con el paso. 
    document.getElementById('select_calls' + which).selectedIndex = step;
}

function indexed_step(list, which = '') {
    // Actualiza el grafo a partir del elemento que se selecciono de la lista del filtro. 

    index = document.getElementById('select_calls' + which).selectedIndex;

    // Setea el paso en la nueva llamada seleccionada. 
    step = index;

    // Resetea la vista. 
    if (index == 0) {
        document.getElementById('div_next' + which).hidden = false;
        document.getElementById('div_prev' + which).hidden = true;
    }
    else if (index < list.length - 1) {
        document.getElementById('div_next' + which).hidden = false;
        document.getElementById('div_prev' + which).hidden = false;
    }
    else if (index == list.length - 1) {
                document.getElementById('div_next' + which).hidden = true;
                document.getElementById('div_prev' + which).hidden = false;
    }

    // Actualiza nodos prendidos.
    refresh_active_nodes(step);

    // Actualiza enlace delegado. 
	update_delegate_link(list[step]);

    // Obtiene el detalle de la llamada del paso actual. 
    get_call_details(list[index], 'details' + which);
}

function simulate(list, which = '') {
    /* Avanza hacia adelante con un delay relativo entre la diferencia del paso 
    siguiente y el actual. */

    if (list.length == 0) {
        document.getElementById('details' + which).innerHTML = "No se encontraron resultados " +  
                                                                "para esa busqueda.";
    } else {
        // Para el caso en el que se arranque a simular desde cero. 
        if (step == 0) {
            first_step(list, which);
        }

        stop = 0;

        document.getElementById('div_stop' + which).hidden = false;

        i = step;

        /* Loop recursivo creciente, para que cada 1 segundo, se avance el paso de
        de la simulacion. Esto se hace así ya que JavaScript es un lenguaje multithreading,
        con lo cual, si se hace un setTimeout en un loop for, todo lo que se hace en el cuerpo
        de esta funcion se pone en una cola. Luego de que pasa el tiempo seteado en el setTimeout, 
        se ejecutan todas las acciones que estan en la cola al mismo tiempo. Este comportamiento no
        es el deseado para la simulacion. Se requiere que cada un determinado lapso de tiempo, se
        muestre una llamada especifica. */
        (function loop (i) { 
            if (stop == 0) {
                delay = setTimeout(function () {
                    if (stop == 0) {
                        next_step(list, which);  
                        if (i < list.length) {
                            loop(++i);       // Recursividad, llama al loop con i++.
                        } else {
                            // Al llegar al final del recorrido de la lista, termina la simulacion. 
                            stop_simulation(which);
                            clearTimeout(delay);
                            return;
                        }  
                    }
                }, 1000);
            } else {
                clearTimeout(delay);
                return;
            }
        })(step);
    }
}

function stop_simulation(which = '') {
    // Frena la simulacion y esconde el boton de Stop. 
    stop = 1;

    document.getElementById('div_stop' + which).hidden = true;
}