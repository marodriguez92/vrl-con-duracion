function analyze_xml() {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            grafo.nodes_list = get_nodes_list(this);
            grafo.links_list = get_ordered_links_list(this);
            [grafo.x_offset, grafo.y_offset] = get_nodes_min_coordinates();
            [grafo.x_limit, grafo.y_limit] = get_nodes_max_coordinates();
        }
    };

    xhttp.open("GET", "./xml/grafo_s_duracion.xml", false);
    //xhttp.open("GET", "./xml/grafo_c_duracion.xml", false);
    xhttp.send();
}