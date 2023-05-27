/**
 * function create select box
 * @param {use to get data and search data option} apiUrl 
 * @param {total display option} pageSize 
 * @param {Name data} dataText 
 * @param {Name input to display option selected} inputName 
 * @param {function call when onselected option} onSelect 
 */
$.fn.createSelectBox = function(apiUrl, pageSize, dataText, inputName, onSelect) {
    let customSelect = $('<div class="custom-select"></div>');
    let selectInput = $('<input type="text" name="' + inputName + '" class="select-input form-control" readonly placeholder="Select option">');
    let optionsContainer = $('<div class="options-container"></div>');
    let optionsList = $('<ul class="options-list"></ul>');
    let searchInput = $('<input type="text" class="search-input form-control no-data" placeholder="Search...">');
    let currentPage = 1;
    let totalPages = 0;

    // create option
    function createOption(value, text) {
        return $("<li>" + text + "</li>").attr("dataSelect", JSON.stringify(value));
    }

    // load option from api server
    function loadData() {
        let data = {
            pageNo: currentPage,
            pageRecord: pageSize,
            keyword: searchInput.val()
        };
        $.ajax({
            url: apiUrl,
            type: "post",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function(data) {
                totalPages = data.page.totalPages;
                console.log(data);
                data.page.content.forEach(function(option) {
                    optionsList.append(createOption(JSON.stringify(option), option[dataText]));
                });
            }
        });
    }

    // when click input -> open list option
    selectInput.click(function() {
        searchInput.val("");
        customSelect.toggleClass('open');

        if (customSelect.hasClass('open')) {
            searchInput.focus();
        }
        currentPage = 1;
        totalPages = 0;
        loadData();
    });

    // handle when click option
    optionsList.on('click', 'li', function() {
        let value = $(this).attr('dataSelect');
        selectInput.val($(this).text());
        customSelect.removeClass('open');
        onSelect(JSON.parse(JSON.parse(value)));
    });

    // when scroll option
    optionsContainer.scroll(function() {
        if (optionsContainer.scrollTop() + optionsContainer.innerHeight() >= optionsList.innerHeight()) {
            if (currentPage < totalPages - 1) {
                currentPage++;
                loadData();
            }
        }
    });

    // when search
    searchInput.on('input', function() {
        optionsList.empty();
        currentPage = 1;
        totalPages = 0;
        loadData();
    });

    // add option 
    optionsContainer.append(searchInput);
    optionsContainer.append(optionsList);

    customSelect.append(selectInput);
    customSelect.append(optionsContainer);

    $(this).append(customSelect);
    $(document).on("click", function(event) {
        if (!customSelect.has(event.target).length) {
            customSelect.removeClass("open");
        }
    });
}

/**
 * 
 * @returns value selected contains (value and text (display on input element))
 */
$.fn.getSelected = function() {
    let selected = $(this).find('.select-input');
    return {
        value: selected.attr("data-select"),
        text: selected.val()
    };
};

/**
 * set data
 * @param {data set to input} data 
 */
$.fn.setData = function(data) {
    let selected = $(this).find('.select-input');
    selected.attr("data-select", JSON.stringify(data));
}