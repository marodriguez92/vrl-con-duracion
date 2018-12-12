function w3_open() {
	document.getElementById("mySidebar").style.display = "block";
	document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
	document.getElementById("mySidebar").style.display = "none";
	document.getElementById("myOverlay").style.display = "none";
}

openNav("nav01");

function openNav(id) {
	document.getElementById("nav01").style.display = "none";
	document.getElementById("nav02").style.display = "none";
	document.getElementById(id).style.display = "block";

	// Resetea a default las navbars
	if (id == 'nav01') {
		document.getElementById('div_next').hidden = true;
		document.getElementById('div_prev').hidden = true;
		document.getElementById('div_calls_list').hidden = true;
		document.getElementById('details').innerHTML = '';

		if (filtered_links_list.length > 0) {
			turn_off_nodes(filtered_links_list[step]);
		}

		empty_active_nodes_queue()

		stop_simulation();
	} else if (id == 'nav02') {
		document.getElementById('div_simulate_filter').hidden = true;
		document.getElementById('div_start_filter').hidden = true;
		document.getElementById('div_next_filter').hidden = true;
		document.getElementById('div_prev_filter').hidden = true;
		document.getElementById('div_calls_list_filter').hidden = true;
		document.getElementById('details_filter').innerHTML = '';
		
		if (filtered_links_list.length > 0) {
			turn_off_nodes(filtered_links_list[step]);
		}

		empty_active_nodes_queue()

		document.getElementById("form_filtro").reset();

		stop_simulation('_filter');
	}
	// Resetea el paso. 
	step = 0;
}