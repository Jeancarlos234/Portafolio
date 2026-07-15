  import 'package:flutter/material.dart';
  import 'package:uuid/uuid.dart';
  import '../models/transaction.dart';
  import '../database/database_helper.dart';

  class TransactionProvider extends ChangeNotifier {
    final DatabaseHelper _db = DatabaseHelper();
    List<Transaction> _transactions = [];

    List<Transaction> get transactions => _transactions;
    List<Transaction> get recentTransactions => _transactions.take(5).toList();

    double get totalIncome {
      return _transactions
          .where((t) => t.type == 'income')
          .fold(0, (sum, t) => sum + t.amount);
    }

    double get totalExpense {
      return _transactions
          .where((t) => t.type == 'expense')
          .fold(0, (sum, t) => sum + t.amount);
    }

    double get balance => totalIncome - totalExpense;

    Map<String, double> get expensesByCategory {
      final Map<String, double> map = {};
      for (var t in _transactions.where((t) => t.type == 'expense')) {
        map[t.category] = (map[t.category] ?? 0) + t.amount;
      }
      return map;
    }

    Future<void> loadTransactions() async {
      _transactions = await _db.getTransactions();
      notifyListeners();
    }

    Future<void> addTransaction({
      required String title,
      required double amount,
      required String category,
      required String type,
      String? note,
    }) async {
      final transaction = Transaction(
        id: const Uuid().v4(),
        title: title,
        amount: amount,
        category: category,
        type: type,
        date: DateTime.now(),
        note: note,
      );
      await _db.insertTransaction(transaction);
      _transactions.insert(0, transaction);
      notifyListeners();
    }

    Future<void> deleteTransaction(String id) async {
      await _db.deleteTransaction(id);
      _transactions.removeWhere((t) => t.id == id);
      notifyListeners();
    }
  }