function analyze_form() {
    // Genera la lista de llamadas en base al filtro que se ingreso. 
    // A su vez, reincia la vista del filtro. 

    document.getElementById('div_simulate_filter').hidden = false;
    document.getElementById('div_start_filter').hidden = false;
    document.getElementById('div_next_filter').hidden = true;
    document.getElementById('div_prev_filter').hidden = true;
    document.getElementById('details_filter').innerHTML = '';
    document.getElementById('div_calls_list_filter').hidden = true;
    if (filtered_links_list.length > 0) {
        turn_off_nodes(filtered_links_list[step]);
    }

    // Vacia la lista del filtro anterior. 
    empty_filter_list();

    if ($('input[name=llamante]').val() != '') {
        id_llamante = get_node_id_from_number($('input[name=llamante]').val());
        if ($('input[name=llamado]').val() != '') {
            id_llamado = get_node_id_from_number($('input[name=llamado]').val());
            filter_by_dates_with_caller_and_called(id_llamante, id_llamado);
        } else {
            filter_by_dates_with_caller(id_llamante);
        }
    } else if ($('input[name=llamado]').val() != '') {
        id_llamado = get_node_id_from_number($('input[name=llamado]').val());
        filter_by_dates_with_called(id_llamado);
    } else {
        filter_by_dates();
    }

    // Resetea el paso. 
    step = 0;
}

function empty_filter_list() {
    length = filtered_links_list.length;
    for (i = 0; i < length; i++) {
        filtered_links_list.pop();
    }
}

function get_node_id_from_number(value) {
    // Obtiene el indice en donde se encuentra el nodo buscado

    for (k = 0; k < grafo.nodes_list.length; k++) {
        if (grafo.nodes_list[k].number == value) {
            return grafo.nodes_list[k].id;
            break;
        }
    }     
}

function filter_by_dates() {
    // Filtra por fechas, sin llamante ni llamado. 
    // En el caso de no haber fecha, es el registro de llamadas completo. 

    if ($('input[name=f_inicio]').val() != '') {
        f_ini = new Date($('input[name=f_inicio]').val().slice(0, 4), 
                            parseInt($('input[name=f_inicio]').val().slice(5, 7)) - 1, 
                            $('input[name=f_inicio]').val().slice(8, 10));
        if ($('input[name=f_fin]').val() != '') {
            f_fin = new Date($('input[name=f_fin]').val().slice(0, 4), 
                                parseInt($('input[name=f_fin]').val().slice(5, 7)) - 1, 
                                $('input[name=f_fin]').val().slice(8, 10));
            for (i = 0; i < grafo.links_list.length; i++) {
                if (grafo.links_list[i].date >= f_ini && grafo.links_list[i].date <= f_fin) {
                        filtered_links_list.push(grafo.links_list[i]);   
                } 
            }
        } else {
            for (i = 0; i < grafo.links_list.length; i++) {
                if (grafo.links_list[i].date >= f_ini) {
                    filtered_links_list.push(grafo.links_list[i]);   
                } 
            }
        }
    } else if ($('input[name=f_fin]').val() != '') {
        for (i = 0; i < grafo.links_list.length; i++) {
            if (grafo.links_list[i].date <= f_fin) {
                    filtered_links_list.push(grafo.links_list[i]);   
            } 
        }
    } else {
        for (i = 0; i < grafo.links_list.length; i++) {
            filtered_links_list.push(grafo.links_list[i]);
        } 
    }
}

function filter_by_dates_with_caller_and_called(id_llamante, id_llamado) {
    // Filtra por fecha, con llamante y llamado. 
    // En el caso de no haber fecha, solo por llamante y llamado. 

    if ($('input[name=f_inicio]').val() != '') {
        f_ini = new Date($('input[name=f_inicio]').val().slice(0, 4), 
                            parseInt($('input[name=f_inicio]').val().slice(5, 7)) - 1, 
                            $('input[name=f_inicio]').val().slice(8, 10));
        if ($('input[name=f_fin]').val() != '') {
            f_fin = new Date($('input[name=f_fin]').val().slice(0, 4), 
                                parseInt($('input[name=f_fin]').val().slice(5, 7)) - 1, 
                                $('input[name=f_fin]').val().slice(8, 10));
            for (i = 0; i < grafo.links_list.length; i++) {
                if (grafo.links_list[i].date >= f_ini && grafo.links_list[i].date <= f_fin) {
                    if (grafo.links_list[i].from == id_llamante && 
                        grafo.links_list[i].to == id_llamado) {

                        filtered_links_list.push(grafo.links_list[i]);   
                    } 
                }
            }
        } else {
            for (i = 0; i < grafo.links_list.length; i++) {
                if (grafo.links_list[i].date >= f_ini) {
                    if (grafo.links_list[i].from == id_llamante && 
                        grafo.links_list[i].to == id_llamado) {

                        filtered_links_list.push(grafo.links_list[i]);   
                    } 
                }
            }
        }
    } else if ($('input[name=f_fin]').val() != '') {
        for (i = 0; i < grafo.links_list.length; i++) {
            if (grafo.links_list[i].date <= f_fin) {
                if (grafo.links_list[i].from == id_llamante && 
                    grafo.links_list[i].to == id_llamado) {

                    filtered_links_list.push(grafo.links_list[i]);   
                } 
            }
        }
    } else {
        for (i = 0; i < grafo.links_list.length; i++) {
            if (grafo.links_list[i].from == id_llamante && 
                grafo.links_list[i].to == id_llamado) {

                filtered_links_list.push(grafo.links_list[i]);   
            } 
        }
    }
}

function filter_by_dates_with_caller(id_llamante) {
    // Filtra por fecha, con llamante y sin llamado.  
    // En el caso de no haber fecha, solo por llamante.

    if ($('input[name=f_inicio]').val() != '') {
        f_ini = new Date($('input[name=f_inicio]').val().slice(0, 4), 
                            parseInt($('input[name=f_inicio]').val().slice(5, 7)) - 1, 
                            $('input[name=f_inicio]').val().slice(8, 10));
        if ($('input[name=f_fin]').val() != '') {
            f_fin = new Date($('input[name=f_fin]').val().slice(0, 4), 
                                parseInt($('input[name=f_fin]').val().slice(5, 7)) - 1, 
                                $('input[name=f_fin]').val().slice(8, 10));
            for (i = 0; i < grafo.links_list.length; i++) {
                if (grafo.links_list[i].date >= f_ini && grafo.links_list[i].date <= f_fin) {
                    if (grafo.links_list[i].from == id_llamante) {
                        filtered_links_list.push(grafo.links_list[i]);   
                    } 
                }
            }
        } else {
            for (i = 0; i < grafo.links_list.length; i++) {
                if (grafo.links_list[i].date >= f_ini) {
                    if (grafo.links_list[i].from == id_llamante) {
                        filtered_links_list.push(grafo.links_list[i]);   
                    } 
                }
            }
        }
    } else if ($('input[name=f_fin]').val() != '') {
        for (i = 0; i < grafo.links_list.length; i++) {
            if (grafo.links_list[i].date <= f_fin) {
                if (grafo.links_list[i].from == id_llamante) {
                    filtered_links_list.push(grafo.links_list[i]);   
                } 
            }
        }
    } else {
        for (i = 0; i < grafo.links_list.length; i++) {
            if (grafo.links_list[i].from == id_llamante) {
                filtered_links_list.push(grafo.links_list[i]);   
            } 
        }
    }
}

function filter_by_dates_with_called(id_llamado) {
    // Filtra por fecha, sin llamante y con llamado. 
    // En el caso de no haber fecha, solo por llamado.

    if ($('input[name=f_inicio]').val() != '') {
        f_ini = new Date($('input[name=f_inicio]').val().slice(0, 4), 
                            parseInt($('input[name=f_inicio]').val().slice(5, 7)) - 1, 
                            $('input[name=f_inicio]').val().slice(8, 10));
        if ($('input[name=f_fin]').val() != '') {
            f_fin = new Date($('input[name=f_fin]').val().slice(0, 4), 
                                parseInt($('input[name=f_fin]').val().slice(5, 7)) - 1, 
                                $('input[name=f_fin]').val().slice(8, 10));
            for (i = 0; i < grafo.links_list.length; i++) {
                if (grafo.links_list[i].date >= f_ini && grafo.links_list[i].date <= f_fin) {
                    if (grafo.links_list[i].to == id_llamado) {
                        filtered_links_list.push(grafo.links_list[i]);   
                    } 
                }
            }
        } else {
            for (i = 0; i < grafo.links_list.length; i++) {
                if (grafo.links_list[i].date >= f_ini) {
                    if (grafo.links_list[i].to == id_llamado) {
                        filtered_links_list.push(grafo.links_list[i]);   
                    } 
                }
            }
        }
    } else if ($('input[name=f_fin]').val() != '') {
        for (i = 0; i < grafo.links_list.length; i++) {
            if (grafo.links_list[i].date <= f_fin) {
                if (grafo.links_list[i].to == id_llamado) {
                    filtered_links_list.push(grafo.links_list[i]);   
                } 
            }
        }
    } else {
        for (i = 0; i < grafo.links_list.length; i++) {
            if (grafo.links_list[i].to == id_llamado) {
                filtered_links_list.push(grafo.links_list[i]);   
            } 
        }
    }
}