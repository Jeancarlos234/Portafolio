  import 'package:sqflite/sqflite.dart';
  import 'package:path/path.dart';
  import '../models/transaction.dart' as model;  // ✅ Usar alias

  class DatabaseHelper {
    static final DatabaseHelper _instance = DatabaseHelper._();
    static Database? _database;

    DatabaseHelper._();

    factory DatabaseHelper() => _instance;

    Future<Database> get database async {
      if (_database != null) return _database!;
      _database = await _initDatabase();
      return _database!;
    }

    Future<Database> _initDatabase() async {
      final dbPath = await getDatabasesPath();
      final path = join(dbPath, 'finance.db');

      return await openDatabase(
        path,
        version: 1,
        onCreate: (db, version) async {
          await db.execute('''
            CREATE TABLE transactions(
              id TEXT PRIMARY KEY,
              title TEXT NOT NULL,
              amount REAL NOT NULL,
              category TEXT NOT NULL,
              type TEXT NOT NULL,
              date TEXT NOT NULL,
              note TEXT
            )
          ''');
        },
      );
    }

    Future<void> insertTransaction(model.Transaction transaction) async {
      final db = await database;
      await db.insert('transactions', transaction.toMap(),
          conflictAlgorithm: ConflictAlgorithm.replace);
    }

    Future<List<model.Transaction>> getTransactions() async {
      final db = await database;
      final List<Map<String, dynamic>> maps = await db.query(
        'transactions',
        orderBy: 'date DESC',
      );
      return List.generate(maps.length, (i) => model.Transaction.fromMap(maps[i]));
    }

    Future<void> deleteTransaction(String id) async {
      final db = await database;
      await db.delete('transactions', where: 'id = ?', whereArgs: [id]);
    }

    Future<double> getTotalByType(String type) async {
      final db = await database;
      final result = await db.rawQuery(
        'SELECT SUM(amount) as total FROM transactions WHERE type = ?',
        [type],
      );
      return (result.first['total'] as double?) ?? 0.0;
    }
  }