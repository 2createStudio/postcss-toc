'use strict';

var postcss = require('postcss');

/**
 * Add number padding
 * @param  {Integer} number       Number to modify
 * @param  {Integer} targetLength Digits count
 * @return {String}              Number with padding
 */
function leftPad(number, targetLength) {
    var output = number + '';

    while (output.length < targetLength) {
        output = '0' + output;
    }

    return output;
};

/**
 * Dash string generator
 * @param  {Integer} count Dashes count
 * @return {String}       Dashes string
 */
function generateDashes(count) {
    return (new Array((Math.max(count, 0) - 0) + 1).join('-'));
};

module.exports = postcss.plugin('postcss-toc', plugin);

function plugin(opts) {
    opts = opts || {};

    return function (css, result) {
        var tableLength = 50;
        var comments = [];
        var table = [];
        var majorCommentIdx = 0;
        var header = '\tTable of Contents';

        css.walkComments(function(comment) {
            var majorCommentRegExp = /-*\s\*\\[\n\r]\s*(.*?)[\n\r]+\\\*\s-*/;
            var commentRaw = comment.source.input.css;

            if (comment.text.match(majorCommentRegExp)) {
                var commentText = comment.text.match(majorCommentRegExp)[1];

                comments.push({
                    text: commentText,
                    type: 'major',
                    isRoman: commentText.match(/^[\I\V\X]*\.\s/)
                });
            } else {
                if (/^[A-Z]/.test(comment.text)) {
                    comments.push({
                        text: comment.text,
                        type: 'minor'
                    });
                }
            }
        });

        for (var i = 0; i < comments.length; i++) {
            var commentPrefix = '';
            var tableText = '';

            if (comments[i].type === 'major') {
                if(!comments[i].isRoman) {
                    majorCommentIdx += 1;

                    commentPrefix = '    ' + leftPad(majorCommentIdx, 2) + '. ';
                } else {
                    majorCommentIdx = 0;
                };
            } else {
                commentPrefix = '         ';
            }

            tableText = commentPrefix + comments[i].text;

            table.push(tableText + ' ' + generateDashes(tableLength - tableText.length));
        }

        css.prepend({
            text: '\n' + header + '\n\n' + table.join('\n') + '\n'
        });


        if (css.first && css.first.next()) {
            css.first.next().raws.before = '\n\n';
        }
    };
}
