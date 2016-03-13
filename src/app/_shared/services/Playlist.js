angular.module('joj.shared')

  .factory('Playlist', function () {

    var service = {};

    service.vgx = [{"n":"U1RWMQ==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjoxMjM0"},{"n":"U1RWMg==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMzoxMjM0"},{"n":"VFYgSk9KIEhE","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNDoxMjM0"},{"n":"VEEz","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNToxMjM0"},{"n":"Q1QgMQ==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNjoxMjM0"},{"n":"Q1QgMg==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNzoxMjM0"},{"n":"Q1QgMjQ=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuODoxMjM0"},{"n":"UHJpbWEgQ09PTCBIRA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuOToxMjM0"},{"n":"U2xvdmFrIFNwb3J0","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMTA6MTIzNA=="},{"n":"U3Bla3RydW0gSEQ=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMTE6MTIzNA=="},{"n":"RE9NQSBIRA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMTI6MTIzNA=="},{"n":"TkVWSUVNMQ==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMTM6MTIzNA=="},{"n":"Tm9lIFRW","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMTQ6MTIzNA=="},{"n":"Tm92YQ==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMTU6MTIzNA=="},{"n":"UHJpbWEgTG92ZQ==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMTY6MTIzNA=="},{"n":"VFYgUGFwcmlrYQ==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMTc6MTIzNA=="},{"n":"U3BvcnQgMiBIRA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMTg6MTIzNA=="},{"n":"RXVyb3Nwb3J0IDEgSEQ=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMTk6MTIzNA=="},{"n":"dHY4","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjA6MTIzNA=="},{"n":"TWluaW1heA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjE6MTIzNA=="},{"n":"TmV2aWVtMg==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjI6MTIzNA=="},{"n":"RE9NQQ==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjM6MTIzNA=="},{"n":"REFKVE8gSEQ=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjQ6MTIzNA=="},{"n":"VFYgQmFycmFuZG92","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjU6MTIzNA=="},{"n":"RmlsbWJveCBFeHRyYSBIRA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjY6MTIzNA=="},{"n":"UmV0cm8gTXVzaWMgVFY=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjc6MTIzNA=="},{"n":"SGlzdG9yeSBIRA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjg6MTIzNA=="},{"n":"U0xBR1IgVFY=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjk6MTIzNA=="},{"n":"RGlzY292ZXJ5IFNob3djYXNlIENaIEhE","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMzA6MTIzNA=="},{"n":"RmlsbSs=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMzE6MTIzNA=="},{"n":"QU1D","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMzI6MTIzNA=="},{"n":"Sk9KIFBMVVMgSEQ=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMzM6MTIzNA=="},{"n":"RGlzbmV5IENa","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMzQ6MTIzNA=="},{"n":"QXV0b01vdG9yU3BvcnQgSEQ=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMzU6MTIzNA=="},{"n":"TmV2aWVtMw==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMzY6MTIzNA=="},{"n":"SmltSmFtIENa","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMzc6MTIzNA=="},{"n":"QW5pbWFsIFBsYW5ldCBDWg==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMzg6MTIzNA=="},{"n":"TVRWIEV1cm9wZSBDWg==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMzk6MTIzNA=="},{"n":"TmF0IEdlbyBXaWxkIENaIEhE","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNDA6MTIzNA=="},{"n":"UHJpbWEgSEQ=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNDE6MTIzNA=="},{"n":"Vmlhc2F0IEV4cGxvcmUvU3BpY2U=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNDI6MTIzNA=="},{"n":"Vmlhc2F0IEhpc3Rvcnk=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNDM6MTIzNA=="},{"n":"Vmlhc2F0IE5hdHVyZQ==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNDQ6MTIzNA=="},{"n":"TmF0IEdlbyBDWiBIRA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNDU6MTIzNA=="},{"n":"RmlzaGluZyBhbmQgSHVudGluZw==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNDg6MTIzNA=="},{"n":"U3BvcnQgMSBDWg==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNDk6MTIzNA=="},{"n":"UlRMIEF1c3RyaWE=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNTA6MTIzNA=="},{"n":"Vk9YIEF1c3RyaWE=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNTE6MTIzNA=="},{"n":"U1VQRVIgUlRMIEE=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNTI6MTIzNA=="},{"n":"RXVyb05ld3M=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNTM6MTIzNA=="},{"n":"UmVhbGl0eSBLaW5ncyBDWg==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNTQ6MTIzNA=="},{"n":"Q1Qgc3BvcnQ=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNTY6MTIzNA=="},{"n":"SEJPIEhE","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNTc6MTIzNA=="},{"n":"REFKVE8=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNjA6MTIzNA=="},{"n":"UmlL","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNjE6MTIzNA=="},{"n":"Q1QgMSBIRA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNjI6MTIzNA=="},{"n":"Q1QgMiBIRA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNjM6MTIzNA=="},{"n":"Q1Qgc3BvcnQgSEQ=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNjQ6MTIzNA=="},{"n":"U1RWMSBIRA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNjU6MTIzNA=="},{"n":"U1RWMiBIRA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNjY6MTIzNA=="},{"n":"TW5hbSBUVg==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNjc6MTIzNA=="},{"n":"Sk9KIENpbmVtYQ==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNjg6MTIzNA=="},{"n":"Q3JpbWUgYW5kIEludmVzdC4gQ1o=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNjk6MTIzNA=="},{"n":"M3NhdA==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNzA6MTIzNA=="},{"n":"S2lLQQ==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNzE6MTIzNA=="},{"n":"WkRG","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNzI6MTIzNA=="},{"n":"UHJvU2llYmVu","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNzg6MTIzNA=="},{"n":"U0FULjE=","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuNzk6MTIzNA=="},{"n":"a2FiZWwgZWlucw==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuODA6MTIzNA=="},{"n":"UnVzc2lhIFRvZGF5","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuODM6MTIzNA=="},{"n":"RnJhbmNlIDI0IChlbiBGcmFu0YdhaXMp","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuODQ6MTIzNA=="},{"n":"VFY1TU9OREUgRVVST1BF","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuODU6MTIzNA=="},{"n":"RnJhbmNlIDI0IChpbiBFbmdsaXNoKQ==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuODY6MTIzNA=="},{"n":"Ti9BIEhE","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMTAwOjEyMzQ="},{"n":"T2NrbyBUVg==","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjI2OjEyMzQ="},{"n":"VFYgTHV4","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjI3OjEyMzQ="},{"n":"V0FV","u":"aHR0cDovLzkxLjIxOS4xMzMuMTg3OjgwODAvdWRwLzIzOS4xLjEuMjI4OjEyMzQ="},{"n":"U2t5IFNwb3J0cyAx","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0djIxXzZ2aHVkbHE4"},{"n":"U2t5IFNwb3J0cyAy","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0djIyX2o1cDFtdGVk"},{"n":"U2t5IFNwb3J0cyAz","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0djIzXzVweDNudGZz"},{"n":"U2t5IFNwb3J0cyA0","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0djI0X2Y4NHJkbWtr"},{"n":"U2t5IFNwb3J0cyA1","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0djI1X3d0MjUwc3Nr"},{"n":"QlQgU3BvcnQgRXVyb3Bl","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0dmJ0ZXVfNW1zZ2o0NHg="},{"n":"QlQgU3BvcnRzIDE=","u":"aHR0cDovL2JpdC5seS8yMEpZOFlM"},{"n":"QlQgU3BvcnRzIDI=","u":"aHR0cDovL2JpdC5seS8xUlRxZ1la"}];

    return service;
  });