import 'package:flutter_test/flutter_test.dart';
import 'package:finance_app/main.dart';

void main() {
  testWidgets('App should load without errors', (WidgetTester tester) async {
    await tester.pumpWidget(const FinanceApp());
    expect(find.text('Finance App'), findsOneWidget);
  });
}