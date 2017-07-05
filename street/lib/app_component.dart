import 'dart:math';
import 'package:angular2/angular2.dart';
import 'dart:html';

@Component(
  selector: 'my-app',
  templateUrl: 'app_component.html',
  directives: const[CORE_DIRECTIVES],
)
class AppComponent {

  int elapsedTime = 0;

  int money = 50;
  List<People>peoples = [
    new People()
      ..workPlaceIndex = 0
      ..jobType = JobType.Farmer,
//    new People()
//      ..workPlaceIndex = 1
//      ..jobType = JobType.Farmer,
//    new People()
//      ..workPlaceIndex = 2
//      ..jobType = JobType.Farmer,
//    new People()
//      ..workPlaceIndex = 3
//      ..jobType = JobType.Farmer,
//    new People()
//      ..workPlaceIndex = 4
//      ..jobType = JobType.Farmer,

  ];
  List<Product> products = [
    new Product(ProductType.Onigiri, 0),
    new Product(ProductType.Water, 1),
  ];
  List<Land> lands = [
    new Land()
      .. landType = LandType.Farm
      ..index = 0,
    new Land()
      .. landType = LandType.Farm
      ..index = 1,
    new Land()
      .. landType = LandType.Farm
      ..index = 2,
    new Land()
      .. landType = LandType.Farm
      ..index = 3,
    new Land()
      .. landType = LandType.Farm
      ..index = 4,
  ];

  AppComponent() {
    window.requestAnimationFrame(animationFlame);
  }

  bool get isAfternoon => elapsedTime % 800 < 600;

  bool get isNight => !isAfternoon;

  Iterable<Product> get onigiris =>
      products.where((p) => p.productType == ProductType.Onigiri);

  Iterable<Product> get waters =>
      products.where((p) => p.productType == ProductType.Water);

  Iterable<People> get passers => peoples.where((p) => p.isPasser);

  Iterable<People> get workers => peoples.where((p) => p.isWorker);

  animationFlame(_) {
    elapsedTime ++;

    for (var people in peoples) {
      people.elapsedTime ++;
      if (people.elapsedTime == 800) {
        people.elapsedTime = 0;
        people.buy = false;
      }

      if (people.elapsedTime % 20 == 5) {
        var product = getProduct(people.elapsedTime);

        if (product == null) {
          continue;
        }

        if (people.buy) {
          continue;
        }

        if (product.productType == ProductType.Onigiri) {
          money += OnigiriSalePrice;
        }
        if (product.productType == ProductType.Water) {
          money += WaterSalePrice;
        }
        people.buy = true;
        products.remove(product);
      }
    }
    window.requestAnimationFrame(animationFlame);
  }

  Product getProduct(int elapsedTime) {
    for (var product in products) {
      if (product.placeIndex == (elapsedTime / 20).floor()) {
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
    for (var x = 0; x < 13; x ++) {
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

class People {

  bool buy = false;

  int elapsedTime = 0;

  int workPlaceIndex;

  JobType jobType;

  bool get isPasser => elapsedTime < 320;

  bool get isWorker => !isPasser;

  int get passX => 280 - elapsedTime;

  int get workPlaceX => workPlaceIndex * 35 + 20 + 15;

  int get workElapsedTime => elapsedTime - 320;

  bool get isGoing => workElapsedTime < workPlaceX;

  bool get isEntry => !isGoing && workElapsedTime < workPlaceX + 30;

  bool get isWorking =>
      !isGoing && !isEntry && workElapsedTime < workPlaceX + 100;

  bool get isOut =>
      !isGoing && !isEntry && !isWorking && workElapsedTime < workPlaceX + 130;


  bool get isLeave =>
      !isGoing && !isEntry && !isWorking && !isOut;

  int get workY {
    if (isEntry) {
      return 200 - (workElapsedTime - workPlaceX);
    }
    if (isWorking) {
      return 170;
    }
    if (isOut) {
      return 170 + (workElapsedTime - workPlaceX - 100);
    }
    return 200;
  }


  int get workX {
    if (isGoing) {
      return elapsedTime - 320;
    }
    if (isEntry) {
      return workPlaceX;
    }

    if (isWorking) {
      return workPlaceX;
    }
    if (isOut) {
      return workPlaceX;
    }
    if (isLeave) {
      return elapsedTime - 320 - 130;
    }
    return 0;
  }

}

class Product {

  final ProductType productType;
  final int placeIndex;


  Product(this.productType, this.placeIndex);

  bool get isOnigiri => productType == ProductType.Onigiri;

  bool get isWater => productType == ProductType.Water;

  int get x => 270 - 20 * placeIndex;


}

enum JobType {
  Farmer
}

enum ProductType {
  Onigiri,
  Water
}

const OnigiriBuyPrice = 10,
    OnigiriSalePrice = 12,
    WaterBuyPrice = 5,
    WaterSalePrice = 6;

class Land {
  int index;
  LandType landType;

  int get x => 20 + (index * 35);
}

enum LandType {
  Farm
}