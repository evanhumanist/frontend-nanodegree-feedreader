'use strict';
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has valid URLs', function() {
            for (let feed of allFeeds) {
              expect(feed.url).toBeDefined();
              expect(feed.url).not.toBe('');
              expect(feed.url).not.toBeNull();
            }
        });


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has valid names', function() {
            for (let feed of allFeeds) {
              expect(feed.name).toBeDefined();
              expect(feed.name).not.toBe('');
              expect(feed.name).not.toBeNull();
            }
        });
    });


    /* DONE: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* DONE: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('show/hide when clicked', function() {
             const MENU_ICON = $('.menu-icon-link');
             const body = $('body');
            MENU_ICON.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            MENU_ICON.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
         });
    });


    /* DONE: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // We use beforeEach and done for the below async handling.
        // Here we load the first feed and check that the amount of entries under the feed element are greater than 0
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('contain entries', function (done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* DONE: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        const FEED = $('.feed');
        let firstFeedContent = null;
        let secondFeedContent = null;

        // We use beforeEach and done for the below async handling.
        // Here we load the first feed and store the inner HTML in a variable.
        // We then change the feed and check the inner HTML of the new feed against the old one.
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeedContent = FEED.find('.entry')[0].innerHTML;
                loadFeed(1, function () {
                    secondFeedContent = FEED.find('.entry')[0].innerHTML;
                    done();
                });
            });
        });

        it('changes content', function(done) {
            expect(firstFeedContent).not.toEqual(secondFeedContent);
            done();
        });
    });
}());
