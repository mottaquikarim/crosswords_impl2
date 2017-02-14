/* CURRENTLY IN: javascript/main.js */

(() => { // protect the lemmings!


    /* DATA FUNCTIONS */

    const getArrryOfLen = (len = 1) => {
        return Array.from(Array(len).keys()) 
    }

    const generateGrid = (numRows, numCols) => {
        return getArrryOfLen(numRows)
            .map((row) => {
                return getArrryOfLen(numCols).map((col) => {
                    return {row,col}
                });
            });
    }

    /* UI FUNCTIONS */

    const generateGridMarkup = (grid) => {
        const htmlBoxes = [];
        for(const row of grid) {
            for(const col of row) {
                const isActive = col.isActive;

                let activeClass = '';
                if (isActive) {
                    activeClass = 'cw-grid-box--active';
                }

                const isRowActive = col.isRowActive;

                let activeRowClass = '';
                if (isRowActive) {
                    activeRowClass = 'cw-grid-box--row-active';
                }

                const isColActive = col.isColActive;

                let activeColClass = '';
                if (isColActive) {
                    activeColClass = 'cw-grid-box--row-active';
                }

                htmlBoxes.push(`<div
                    class="cw-grid-box js-box ${activeClass} ${activeRowClass} ${activeColClass}"
                    data-row="${col.row}"
                    data-col="${col.col}"
                    style="width: ${100/grid.length}%; height: ${100/row.length}%">
                        
                    <span>
                        ${col.value || ''}
                    </span>
               </div>`);
            }
        }

        return htmlBoxes;
    }

    const on = (parentEl, evtName, targetSelector, callback) => {

        parentEl.addEventListener(evtName, (e) => {
            let target = e.target;
            while (!target.matches(targetSelector) && target !== parentEl) {
                console.log('current targ is', target);
                target = target.parentNode;
            }

            if (target === parentEl) {
                // this means not found, just ignore and stop...
                console.log('Not Found');
            }
            else {
                callback(e, target);
            }
        });

    };


    /* START PROGRAM */

    const grid = generateGrid(15, 15);
    const gridHtml = generateGridMarkup(grid);
    const gridEl = document.querySelector('.js-grid');
    gridEl.innerHTML = gridHtml.join('');

    let activeRow = null;
    let activeCol = null;

    let currentMode = 'row';
    document.querySelector('.js-mode').addEventListener('change', (e) => {
        currentMode = e.target.value.toLowerCase();

        if (currentMode === 'row') {
            for(const row of grid) {
                row[activeCol].isColActive = false;
            }
            for(const col of grid[activeRow]) {
                col.isRowActive = true;
            }
        }
        else {
            for(const col of grid[activeRow]) {
                col.isRowActive = false;
            }
            for(const row of grid) {
                row[activeCol].isColActive = true;
            }
        }

        const gridHtml = generateGridMarkup(grid);
        gridEl.innerHTML = gridHtml.join('');
    });

    on(gridEl, 'click', '.js-box', (e, elementClicked) => {
        const row = elementClicked.getAttribute('data-row');
        const col = elementClicked.getAttribute('data-col');

        // reset previous active
        if (activeRow !== null && activeCol !== null) {
            grid[activeRow][activeCol].isActive = false;
            if (currentMode === 'row') {
                for(const col of grid[activeRow]) {
                    col.isRowActive = false;
                }
            }
            else {
                for(const row of grid) {
                    row[activeCol].isColActive = false;
                }
            }
        }

        grid[row][col].isActive = true;
        if (currentMode === 'row') {
            for(const col of grid[row]) {
                col.isRowActive = true;
            }
        }
        else {
            for(const row of grid) {
                row[col].isColActive = true;
            }
        }

        const gridHtml = generateGridMarkup(grid);
        gridEl.innerHTML = gridHtml.join('');

        activeRow = row;
        activeCol = col;
    });

    window.addEventListener('keydown', (e) => {
        // arrow left
        if (e.keyCode === 37) {

        }
        // arrow right
        else if (e.keyCode === 39) {

        }
    });

    window.addEventListener('keypress', (e) => {
        if (activeRow !== null && activeCol !== null) {
            grid[activeRow][activeCol].value = e.key.toUpperCase();

            grid[activeRow][activeCol].isActive = false;

            if (currentMode === 'row') {
                activeCol = ++activeCol % grid.length;
            }
            else {
                activeRow = ++activeRow % grid.length;
            }

            grid[activeRow][activeCol].isActive = true;

            const gridHtml = generateGridMarkup(grid);
            gridEl.innerHTML = gridHtml.join('');
        }
    });


})();
