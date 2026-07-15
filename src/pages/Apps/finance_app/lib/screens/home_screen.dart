  import 'package:flutter/material.dart';
  import 'package:provider/provider.dart';
  import 'package:fl_chart/fl_chart.dart';
  import '../providers/transaction_provider.dart';

  class HomeScreen extends StatefulWidget {
    const HomeScreen({super.key});

    @override
    State<HomeScreen> createState() => _HomeScreenState();
  }

  class _HomeScreenState extends State<HomeScreen> {
    @override
    void initState() {
      super.initState();
      WidgetsBinding.instance.addPostFrameCallback((_) {
        context.read<TransactionProvider>().loadTransactions();
      });
    }

    @override
    Widget build(BuildContext context) {
      return Consumer<TransactionProvider>(
        builder: (context, provider, _) {
          return Scaffold(
            backgroundColor: const Color(0xFFF8FAFC),
            appBar: AppBar(
              title: const Text('Finance App'),
              centerTitle: true,
              elevation: 0,
              backgroundColor: Colors.transparent,
              foregroundColor: const Color(0xFF1E293B),
            ),
            body: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Balance Card
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF6366F1), Color(0xFF4F46E5)],
                      ),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Column(
                      children: [
                        const Text('Balance Total',
                            style: TextStyle(color: Colors.white70)),
                        const SizedBox(height: 8),
                        Text('\$${provider.balance.toStringAsFixed(2)}',
                            style: const TextStyle(
                                color: Colors.white,
                                fontSize: 36,
                                fontWeight: FontWeight.bold)),
                        const SizedBox(height: 16),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            _buildAmountChip(
                                'Ingresos', provider.totalIncome, Colors.greenAccent),
                            _buildAmountChip(
                                'Gastos', provider.totalExpense, Colors.redAccent),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Quick Actions
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildActionButton(context, 'Ingreso', true),
                      _buildActionButton(context, 'Gasto', false),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // Chart
                  if (provider.expensesByCategory.isNotEmpty) ...[
                    const Text('Gastos por Categoría',
                        style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF1E293B))),
                    const SizedBox(height: 12),
                    SizedBox(
                      height: 200,
                      child: PieChart(
                        PieChartData(
                          sections: provider.expensesByCategory.entries.map((e) {
                            return PieChartSectionData(
                              value: e.value,
                              title: '${e.key}\n\$${e.value.toStringAsFixed(0)}',
                              color: _getCategoryColor(e.key),
                              radius: 80,
                              titleStyle: const TextStyle(
                                  fontSize: 10, color: Colors.white),
                            );
                          }).toList(),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                  ],

                  // Recent Transactions
                  const Text('Transacciones Recientes',
                      style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1E293B))),
                  const SizedBox(height: 12),
                  ...provider.recentTransactions.map((t) => _buildTransactionTile(t, provider)),
                ],
              ),
            ),
          );
        },
      );
    }

    Widget _buildAmountChip(String label, double amount, Color color) {
      return Column(
        children: [
          Text(label, style: const TextStyle(color: Colors.white70)),
          Text('\$${amount.toStringAsFixed(2)}',
              style: TextStyle(
                  color: color, fontSize: 18, fontWeight: FontWeight.bold)),
        ],
      );
    }

    Widget _buildActionButton(BuildContext context, String label, bool isIncome) {
      return ElevatedButton.icon(
        onPressed: () => _showAddDialog(context, isIncome),
        icon: Icon(isIncome ? Icons.add_circle : Icons.remove_circle),
        label: Text(label),
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          backgroundColor: isIncome ? Colors.green : Colors.red,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      );
    }

    Widget _buildTransactionTile(transaction, provider) {
      return ListTile(
        leading: CircleAvatar(
          backgroundColor: transaction.type == 'income'
              ? Colors.green.withOpacity(0.1)
              : Colors.red.withOpacity(0.1),
          child: Icon(
            transaction.type == 'income' ? Icons.arrow_downward : Icons.arrow_upward,
            color: transaction.type == 'income' ? Colors.green : Colors.red,
          ),
        ),
        title: Text(transaction.title,
            style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(transaction.category,
            style: const TextStyle(color: Colors.grey)),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              '${transaction.type == 'income' ? '+' : '-'}\$${transaction.amount.toStringAsFixed(2)}',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: transaction.type == 'income' ? Colors.green : Colors.red),
            ),
            Text(
              '${transaction.date.day}/${transaction.date.month}',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
      );
    }

    void _showAddDialog(BuildContext context, bool isIncome) {
      final titleCtrl = TextEditingController();
      final amountCtrl = TextEditingController();
      String category = 'General';

      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(isIncome ? 'Nuevo Ingreso' : 'Nuevo Gasto'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Título')),
              TextField(controller: amountCtrl, decoration: const InputDecoration(labelText: 'Monto'), keyboardType: TextInputType.number),
              DropdownButtonFormField(
                value: category,
                items: ['General', 'Comida', 'Transporte', 'Entretenimiento', 'Servicios', 'Salud']
                    .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                    .toList(),
                onChanged: (v) => category = v ?? 'General',
              ),
            ],
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Cancelar')),
            ElevatedButton(
              onPressed: () {
                if (titleCtrl.text.isNotEmpty && amountCtrl.text.isNotEmpty) {
                  context.read<TransactionProvider>().addTransaction(
                    title: titleCtrl.text,
                    amount: double.parse(amountCtrl.text),
                    category: category,
                    type: isIncome ? 'income' : 'expense',
                  );
                  Navigator.pop(ctx);
                }
              },
              child: const Text('Guardar'),
            ),
          ],
        ),
      );
    }

    Color _getCategoryColor(String category) {
      const colors = {
        'General': Color(0xFF6366F1),
        'Comida': Color(0xFFF59E0B),
        'Transporte': Color(0xFF3B82F6),
        'Entretenimiento': Color(0xFFEC4899),
        'Servicios': Color(0xFF10B981),
        'Salud': Color(0xFFEF4444),
      };
      return colors[category] ?? Colors.grey;
    }
  }