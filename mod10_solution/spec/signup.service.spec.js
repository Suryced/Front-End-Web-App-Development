(function () {
"use strict";

describe('SignupService', function () {
  var SignupService;
  var $httpBackend;
  var ApiPath;

  beforeEach(module('public'));

  beforeEach(inject(function (_SignupService_, _$httpBackend_, _ApiPath_) {
    SignupService = _SignupService_;
    $httpBackend = _$httpBackend_;
    ApiPath = _ApiPath_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('returns the menu item when the favorite item exists', function () {
    var result;

    $httpBackend.expectGET(ApiPath + '/menu_items/L/menu_items/0.json').respond(200, {
      short_name: 'L1',
      name: 'Won Ton Soup with Chicken'
    });

    SignupService.getFavoriteItem('L1').then(function (menuItem) {
      result = menuItem;
    });

    $httpBackend.flush();

    expect(result).toEqual({
      short_name: 'L1',
      name: 'Won Ton Soup with Chicken'
    });
  });

  it('returns null when the favorite item does not exist', function () {
    var result;

    $httpBackend.expectGET(ApiPath + '/menu_items/ZZ/menu_items/8.json').respond(200, null);

    SignupService.getFavoriteItem('ZZ9').then(function (menuItem) {
      result = menuItem;
    });

    $httpBackend.flush();

    expect(result).toBeNull();
  });
});

})();
