var expect = require('chai').expect,
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead can not display null or boolean if the item is a string', function () {
    'use strict';

    let myTypeahead;

    before(function () {

        document.write('<input class="js-typeahead-no-null-or-boolean-for-string">');

        myTypeahead = $.typeahead({
            input: '.js-typeahead-no-null-or-boolean-for-string',
            minLength: 0,
            generateOnLoad: true,
            source: {
                data: [null, false, true, "null", "false", "true"]
            }
        });
    });

    it('Should display any value types', function () {
        myTypeahead.node.trigger('input.typeahead');

        expect(myTypeahead.result.length).to.equal(3);
    });
});

describe('Typeahead can display any value type Tests from inside an object', function () {
    'use strict';

    let myTypeahead;

    before(function () {

        document.write('<input class="js-typeahead-any-value-type-for-object">');

        myTypeahead = $.typeahead({
            input: '.js-typeahead-any-value-type-for-object',
            minLength: 0,
            generateOnLoad: true,
            display: ['string','numeric', 'booleanT', 'booleanF', 'undefined', 'deeper.key.level'],
            source: {
                data: [{
                    string: 'string',
                    numeric: 12345,
                    booleanT: true,
                    booleanF: false,
                    deeper: {
                        key: {
                            level: 42
                        }
                    }
                }]
            }
        });
    });

    it('Should display any value types', function () {
        myTypeahead.node.trigger('input.typeahead');

        expect(myTypeahead.resultHtml.find('span').text()).to.equal('string 12345 true false 42');
    });

    it('Should display a boolean "false" search', function () {
        myTypeahead.node.val('false');
        myTypeahead.node.trigger('input.typeahead');

        expect(myTypeahead.result.length).to.equal(1);
    });

    it('Should display a numeric value', function () {
        myTypeahead.node.val('345');
        myTypeahead.node.trigger('input.typeahead');

        expect(myTypeahead.result.length).to.equal(1);
    });
});
