const inputForm = document.getElementById("matchingForm");
const needleInput = document.getElementById('needleInput');
const haystackInput = document.getElementById('haystackInput');
const stringMatchTable = document.getElementById('stringMatchTable');
const seperator = document.getElementById('seperator');

function tcreateRow(headStr, rowStr) {
	const tr = document.createElement('tr');

	const th = document.createElement('th');
	th.scope = 'col';
	th.textContent = headStr;
	tr.appendChild(th);

	for (let pair of rowStr) {
		const td = document.createElement('td');
		td.scope = 'col';

		if (pair !== undefined) {
			td.textContent = pair[0];
			td.className = pair[1];
		}

		tr.appendChild(td);
	}

	return tr;
}

function tappendRow(parent, headStr, rowStr) {
	const row = tcreateRow(headStr, rowStr);
	parent.appendChild(row);
}

function genMatchTable(matchArray) {
	const haystack = haystackInput.value;

	stringMatchTable.innerHTML = '';

	const table = document.createElement('table');
	table.className = 'table table-bordered';

	// Generate head row

	const thead = document.createElement('thead');
	tappendRow(thead, "#", haystack.split('').map(c => [c, "text-normal-emphasis"]));
	table.appendChild(thead);

	// Generate body

	const tbody = document.createElement('tbody');
	tbody.className = "table-group-divider";

	for (let i = 0; i < matchArray.length; ++i) {
		tappendRow(tbody, i, matchArray[i]);
	}

	table.appendChild(tbody);
	stringMatchTable.appendChild(table);
}
