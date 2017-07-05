import 'dart:math';
import 'package:angular2/angular2.dart';
import 'dart:html';

@Component(
  selector: 'my-app',
  templateUrl: 'app_component.html',
  directives: const[CORE_DIRECTIVES],
)
class AppComponent {

  Random random = new Random.secure();
  int money = 50;
  List<Passer>passers = [new Passer()];
  List<Product> products = [
    new Product(ProductType.Onigiri, 0),
    new Product(ProductType.Water, 1),
  ];

  AppComponent() {
    window.requestAnimationFrame(animationFlame);
  }

  Iterable<Product> get onigiris =>
      products.where((p) => p.productType == ProductType.Onigiri);

  Iterable<Product> get waters =>
      products.where((p) => p.productType == ProductType.Water);

  animationFlame(_) {
    for (var passer in passers) {
      passer.elapsedTime ++;
      if (passer.elapsedTime == 320) {
        passer.elapsedTime = 0;
      }

      if (passer.elapsedTime % 20 == 0) {
        var product = getProduct(passer.elapsedTime);

        if (product == null) {
          continue;
        }

        if (random.nextInt(3) == 1) {
          if (product.productType == ProductType.Onigiri) {
            money += OnigiriSalePrice;
          }
          if (product.productType == ProductType.Water) {
            money += WaterSalePrice;
          }
          products.remove(product);
        }
      }
    }
    window.requestAnimationFrame(animationFlame);
  }

  Product getProduct(int elapsedTime) {
    for (var product in products) {
      if (product.placeIndex == (elapsedTime / 20)) {
        return product;
      }
    }
    return null;
  }

  buyOnigiri() {
    if (money < OnigiriBuyPrice) {
      return;
    }
    var index = getIndex();
    if (index == null) {
      return;
    }
    money -= OnigiriBuyPrice;
    products.add(new Product(ProductType.Onigiri, index));
  }

  buyWater() {
    if (money < WaterBuyPrice) {
      return;
    }
    var index = getIndex();
    if (index == null) {
      return;
    }
    money -= WaterBuyPrice;
    products.add(new Product(ProductType.Water, index));
  }

  int getIndex() {
    for (var x = 0; x < 14; x ++) {
      if (onIndex(x)) {
        continue;
      }
      return x;
    }
    return null;
  }

  bool onIndex(int x) {
    for (var product in products) {
      if (product.placeIndex == x) {
        return true;
      }
    }
    return false;
  }

}

class Passer {

  int elapsedTime = 0;

  int get x => 280 - elapsedTime;

}

class Product {

  final ProductType productType;
  final int placeIndex;

  Product(this.productType, this.placeIndex);

  bool get isOnigiri => productType == ProductType.Onigiri;

  bool get isWater => productType == ProductType.Water;

  int get x => 280 - 20 * placeIndex;


}

enum ProductType {
  Onigiri,
  Water
}

const OnigiriBuyPrice = 10,
    OnigiriSalePrice = 12,
    WaterBuyPrice = 5,
    WaterSalePrice = 6;