# applitools-hackathon
A repo to house our submission to the 2019 Applitools hackathon.

## Running the tests

Running is pretty simple:

Don't be like me. Don't forget to `npm install` first! There's a lot of necessary dependencies. Duh...amirite?

To run against V1 of the app, execute `npm run cypress:v1` in your terminal.
   
To run against V2 of the app, you guessed it, execute `npm run cypress:v2` in your terminal.

## The Traditional Approach

### Login Page UI Elements Test (login-spec.js)

We intentionally took a naive approach to this test. Admittedly, we'd personally never do this kind of test in this kind of test suite, so I wasn't overly happy about writing the test. I'd have prefered this type of testing was done using DOM snapshotting at unit & integration test time. In its current state, the test will fail on the first failed assertion and never run the rest. The good news is we get a screenshot on failure, so we can see at a glance that there's more wrong with the new version than just the single failing element.

Given more time, we'd likely do the work to monkey-patch chai and the runner to handle soft assertions. This way, we'd get a test failure, but also a full summary of which assertions passed and failed.

### Data-Driven Test (login-spec.js)

These tests also involved testing the login page, so we decided in our suite they would also live in the login spec file. 

Yes, this could be written in a data-driven way using one test block and feeding it various data sets. However, the test is so simple once we abstract the code away for handling login (and the custom assertion to trim text first, since...yeah...there were some white spaces alright) that we favour a test report showing each scenario and highlighting which one(s) failed in nice, plain-english names. Willing to bet there's a way to dynamically create test names, but the complexity didn't feel worth a couple extra `it` blocks.

### Table Sort Test (recent-transactions-spec.js)

We decided to turn this one into two tests. One that asserts each row's data integrity was maintained during the sort - No mixing of data where the wrong transaction suddenly has the wrong value. The other asserts that the sort is in the correct order.

The majority of the code lives in a `before` block. It looks like a lot, but really a good chunk of it could be simplified if were modified our target application's source code to add some helpful attributes. On the plus side, the actual tests are one liners :)

### Canvas Chart Test (compare-expenses-spec.js)

We knew this would be tricky bit when we started - everyone who's done UI automation knows the dreaded `<canvas>` element.

Since we were told to assume the test data would be static, we stored it in a fixture file (`fixtures/barChartData.json`). Static data in automated testing makes us sad pandas. In real life we'd likely generate expected data to add some controlled randomness to our testing. We noticed theres a function under the hood to generate the data for 2019 (or any time the 'show data for next year' button is pressed). We copied and pasted that function into our code to get the expected next year's test data. *Yes, copying and pasting is naughty* - but hear us out. With access to the source code, that function could be refactored in such a way that it could be imported into our test. Now if the code to generate that data was ever modified, the test would change along with it and continue passing. And to ensure those changes were actually intended, well, the function would be properly unit tested...right? 

There's actually 4 tests in this file. Checking that the labels are correct, and one to check the data for each of the 3 years on the chart.

We did some hackery on the window object to grab the actual data being given to the chart script. Pretty sure in a typical app this would be coming from an xhr call to a service or some backend, so it'd be much nicer to be able to spy or stub that call.

Obviously after all this work, we can't actually verify the bars are present and correct. Our hope is that when using 3rd party libraries such as ChartJS, the functionality is well tested. Also because they're so heavily used, it's unlikely we'll be the first people to find an issue with the charting code that someone hasn't already reported. This may not always be true...but the odds aren't bad.

### Dynamic Content Test (ads-spec.js)

We thought this one would be a really difficult one, but it ended up being straightforward. We grab selectors for each of the div containers for the ads, and then we use a single selector to identify the ad images themselves (identified as an `img` element which has a `src` attribute ending in '.gif).

The single test contains multiple assertions. We could break this into two tests: 'are there two ads?', and 'are both ads visible?'. But that seems overkill. One test, 23 lines total including comments, brackets and whitespace.

We would also like to note, we didn't actually do the login action first to get to this page (which the test instructions asked for). Login was tested elsewhere so it seemed uncessary to perform a step that isn't needed. In real life this would be slightly more complicated and involve potentially an earlier log in and storing of a cookie, or a call to a login API. Either way, doing the `cy.visit('/hackathonApp.html?showAd=true)` straight to the app's main page is meant to represent this.

## The Visual AI Approach

### Login Page UI Elements Test (login-visual-spec.js)

TDB

### Data-Driven Test (login-visual-spec.js)

TBD

### Table Sort Test (recent-transactions-visual-spec.js)

TBD

### Canvas Chart Test (compare-expenses-visual-spec.js)

TBD

### Dynamic Content Test (ads-visual-spec.js)

TBD

## Findings & Thoughts

Decided to do a little [live tweeting](https://twitter.com/graemeRharvey/status/1194779433376374793) of some observations while writing these tests.
After the contest closes, a blog post will follow with further thoughts over at [my personal blog](http://iteststuff.ca).
