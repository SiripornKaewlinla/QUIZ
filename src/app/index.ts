// แสดงกราฟรายรับรายจ่ายใน 2 เดือนย้อนหลัง
router.get('/graph', verifyToken, async (req, res) => {
    const now = new Date();
    const twoMonthsAgo = new Date(now.setMonth(now.getMonth() - 2));

    const transactions = await Transaction.find({
        userId: req.user.id,
        date: { $gte: twoMonthsAgo }
    });

    const incomeTotal = transactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0);
    
    const expenseTotal = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0);
    
    res.json({ incomeTotal, expenseTotal });
});
