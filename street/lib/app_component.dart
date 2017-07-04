import 'package:angular2/angular2.dart';
import 'dart:html';

@Component(
  selector: 'my-app',
  templateUrl: 'app_component.html',
  directives: const[CORE_DIRECTIVES],
)
class AppComponent {

  List<Passer>passers = [new Passer()];
  List<Product> products = [
    new Product(ProductType.Onigiri, 0),
    new Product(ProductType.Water, 1),
  ];

  AppComponent() {
    window.requestAnimationFrame(animationFlame);
  }

  animationFlame(_) {
    for (var passer in passers) {
      passer.elapsedTime ++;
      if (passer.elapsedTime == 320) {
        passer.elapsedTime = 0;
      }
    }
    window.requestAnimationFrame(animationFlame);
  }

}

class Passer {

  int elapsedTime = 0;

  String get d => "M${280 - elapsedTime},100 L${290 - elapsedTime},110 V90 z";

}

class Product {

  final ProductType productType;
  final int placeIndex;

  Product(this.productType, this.placeIndex);

  bool get isOnigiri => productType == ProductType.Onigiri;

  bool get isWater => productType == ProductType.Water;

  String get onigiriD =>
      "M${280 - (placeIndex * 10)},80 L${290 - (placeIndex * 10)},80 L${285 -(placeIndex * 10)},70 Z";

  String get waterD => "M${280 - (placeIndex * 20)},80 H${290 - (placeIndex * 20)} V60 H${280 - (placeIndex * 20)} Z";

}

enum ProductType {
  Onigiri,
  Water
}