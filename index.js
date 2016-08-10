'use strict';

const request = require('request-promise');
const cheerio = require('cheerio');

exports.handler = function(event, context) {
    const domain = event.domain;
    const pages = event.pages;
    const linkSelector = event.linkSelector;

    Promise
        .all(pages.map((page) => {
            return request({
                uri: domain + page,

                transform: function (body) {
                    return cheerio.load(body);
                },
            });
        }))

        .then((pages) => {
            let medalLinks = [];

            pages.forEach(($) => {
                $(linkSelector + ' a').each((i, element) => {
                    medalLinks.push($(element).attr('href'));
                });
            });

            return medalLinks;
        })

        .then((medalLinks) => {
            return Promise.all(medalLinks.map((medalLink) => {
                return request({
                    uri: domain + medalLink,

                    transform: function (body) {
                        return cheerio.load(body);
                    },
                });
            }));
        })

        .then((pages) => {
            pages.forEach(($) => {
                $('.tabbertab')
            });

            return medalLinks;
        })

        .then(() => {
            context.done(null, 'KHUX medal scraper complete.');
        })
        .catch((err) => {
            console.log(err);

            context.done(err);
        });
};