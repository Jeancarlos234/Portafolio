  class Transaction {
    final String id;
    final String title;
    final double amount;
    final String category;
    final String type; // 'income' o 'expense'
    final DateTime date;
    final String? note;

    Transaction({
      required this.id,
      required this.title,
      required this.amount,
      required this.category,
      required this.type,
      required this.date,
      this.note,
    });

    Map<String, dynamic> toMap() {
      return {
        'id': id,
        'title': title,
        'amount': amount,
        'category': category,
        'type': type,
        'date': date.toIso8601String(),
        'note': note,
      };
    }

    factory Transaction.fromMap(Map<String, dynamic> map) {
      return Transaction(
        id: map['id'],
        title: map['title'],
        amount: map['amount'],
        category: map['category'],
        type: map['type'],
        date: DateTime.parse(map['date']),
        note: map['note'],
      );
    }
  }