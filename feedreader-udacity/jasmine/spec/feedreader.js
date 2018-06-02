/* feedreader.js
 */
$(function() {
   
describe('RSS Feeds', function() { /* RSS feed testing unit */ 
        /* Test - if allFeeds variable has been defined and that it is not empty*/ 
    it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
    });

        /* Test if allFeeds object and ensures it has a URL defined nd that the URL is not empty.*/
    it("has an URL defined and the URL is not empty", function() {
        allFeeds.forEach(function(feed) {fined
        expect(feed.url).toBeDefined(); /* test feed to be defined*/
        expect(feed.url.length).not.toBe(0); /* test feed not to be empty*/
        expect(feed.url).toMatch(/^(http|https):\/\//); /* test feed prefix start*/
        });
    });

        /* Test that loops through each feed in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.*/
    it('has a name defined and the name is not empty', function() {
        allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined(); /* test feed name to be defined*/
        expect(feed.name).not.toBe(''); /* test feed name not to be empty*/
        });
    });
});


        /* Test suite named "The menu" */
describe("The menu", function() { /* sencond test unit - menu*/
        
        /* Test that ensures the menu element is hidden by default. */
    it('the menu element is hidden by default', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true); /* test if by defaul menu is hiden*/
    });
         
         /* Test that ensures the menu changes visibility when the menu icon is clicked.*/
    it('the menu display when clicked and does it hide when clicked again', function() {
        const menuDisply = $('.menu-icon-link'); /* test menu change on click*/
        menuDisply.click();
        expect($('body').hasClass('menu-hidden')).toBe(false);
        menuDisply.click();
        expect($('body').hasClass('menu-hidden')).toBe(true);
    });
});  
        /* Test suite named "Initial Entries" */
describe("Initial Entries", function() { /* third test units - entries*/

        /* Test that ensures when the loadFeed function is called and completes its work, t
         * here is at least a single .entry element within the .feed container.*/
      beforeEach(function(done) { /* load feed*/
            loadFeed(0, function() {
            done();
            });
        });
    it('when the loadFeed function is called has a single .entry within the .feed container', function(done) {
       const parent = $('.feed'); /* feed variable*/
       const entries = $('.entry'); /* entries variable*/
       expect(parent.entries.length).toBeGreaterThan(0); /* Test if feed entris aren't empty*/
      done();
    });
    });

        /* Test suite named "New Feed Selection" */
describe("New Feed Selection", function() { /* New feed test unit*/
        
        /* Test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.*/
        let initFeedContent; /* variable define*/
        let newFeedContent;

        beforeEach(function(done) {
            loadFeed(0, function() {
                initFeedContent = document.querySelector(".feed").innerHTML;
                loadFeed(1, function() {
                done();
                });
            });
        });

    it('when new feed is loaded content actually changes', function(done) {
            newFeedContent = document.querySelector(".feed").innerHTML; /* Check if feed changes are loaded*/
            expect(initFeedContent).not.toBe(newFeedContent);
            done();    
    });  
     });
}());
