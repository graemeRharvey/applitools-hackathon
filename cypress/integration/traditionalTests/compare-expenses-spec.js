/// <reference types="cypress" />

const selectors = {
  addDatasetButton: "button#addDataset"
}

let expectedBarChartData;
let window;
let actualBarChartData;

describe("Compare Expenses Chart", () => {
  before(() => {
    cy.fixture("barChartData").then(data => {
      expectedBarChartData = data;
    });

    cy.visit("/hackathonChart.html");

    cy.window().then(win => {
      window = win;
      actualBarChartData = window.barChartData;
    });
  });

  // In the real world, this data would come from an XHR that I would read with cy.route
  // instead of hacking it out of the window object
  it("has valid labels", () => {
    expect(actualBarChartData.labels).to.deep.equal(expectedBarChartData.labels);
  })

  it("has valid 2017 data", () => {
    const expected = expectedBarChartData.datasets.find(d => d.label === "2017");
    const actual = actualBarChartData.datasets.find(d => d.label === expected.label);
    
    compareDatasets(expected, actual);
  });

  it("has valid 2018 data", () => {
    const expected = expectedBarChartData.datasets.find(d => d.label === "2018");
    const actual = actualBarChartData.datasets.find(d => d.label === expected.label);

    compareDatasets(expected, actual);
  });

  it("adds valid 2019 data", () => {
    const expectedNextYearData = getNextYearData(window, expectedBarChartData);

    cy.get(selectors.addDatasetButton).click();

    cy.window().then(updatedWindow => {
      const actual = updatedWindow.barChartData.datasets[2];

      compareDatasets(expectedNextYearData, actual);
    });
  });
});

// This is copied from the page source.  In the real world I'd have access to the source code
// and would refactor this function and import it to share the code. If someone decided to modify
// how the app generated data, the change would instantly be reflected in the tests, since the
// library is shared.
const getNextYearData = function(window, barChartData) {
  var color = window.Chart.helpers.color;
  const colorNames = Object.keys(window.chartColors);

  var colorName = colorNames[barChartData.datasets.length % colorNames.length];
  var dsColor = window.chartColors[colorName];
  var newDataset = {
    label: 2016 + (barChartData.datasets.length + 1),
    backgroundColor: color(dsColor).alpha(0.5).rgbString(),
    borderColor: dsColor,
    borderWidth: 1,
    data: []
  };

  for (var index = 0; index < barChartData.labels.length; ++index) {
    newDataset.data.push((index +1) * 5);
  }

  return newDataset;
};

function compareDatasets(expected, actual) {
  expect(actual).to.not.be.null;
  Object.keys(expected).forEach(key => {
    expect(actual[key].toString()).to.equal(expected[key].toString());
  });
}
