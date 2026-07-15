  import 'package:flutter/material.dart';
  import 'package:google_fonts/google_fonts.dart';
  import 'package:provider/provider.dart';
  import 'screens/home_screen.dart';
  import 'providers/transaction_provider.dart';

  void main() {
    runApp(const FinanceApp());
  }

  class FinanceApp extends StatelessWidget {
    const FinanceApp({super.key});

    @override
    Widget build(BuildContext context) {
      return ChangeNotifierProvider(
        create: (_) => TransactionProvider(),
        child: MaterialApp(
          title: 'Finance App',
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            useMaterial3: true,
            colorScheme: ColorScheme.fromSeed(
              seedColor: const Color(0xFF6366F1),
              brightness: Brightness.light,
            ),
            textTheme: GoogleFonts.interTextTheme(),
          ),
          home: const HomeScreen(),
        ),
      );
    }
  }