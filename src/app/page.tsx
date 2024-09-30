// pages/index.tsx
"use client"; 

import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface Transaction {
    id: string;
    amount: number;  // จำนวนเงิน
    date: string;    // วันที่
    type: 'income' | 'expense';  // ประเภท (รายรับ/รายจ่าย)
    note: string;    // โน้ตสำหรับบันทึกรายละเอียด
}

const HomePage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [incomeTotal, setIncomeTotal] = useState<number>(0);
    const [expenseTotal, setExpenseTotal] = useState<number>(0);

    // ฟังก์ชันดึงข้อมูลรายการ
    const fetchTransactions = async () => {
        try {
            const response = await fetch('/api/transactions');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    // เรียกใช้ฟังก์ชัน fetchTransactions เมื่อ component ถูก mount
    useEffect(() => {
        fetchTransactions();
    }, []);

    // คำนวณยอดรวมรายรับและรายจ่าย
    useEffect(() => {
        const income = transactions
            .filter(tx => tx.type === 'income')
            .reduce((sum, tx) => sum + tx.amount, 0);
        const expense = transactions
            .filter(tx => tx.type === 'expense')
            .reduce((sum, tx) => sum + tx.amount, 0);
        
        setIncomeTotal(income);
        setExpenseTotal(expense);
    }, [transactions]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>บันทึกรายรับรายจ่าย</h1>
            <h2 className={styles.incomeTotal}>ยอดรวมรายรับ: {incomeTotal.toLocaleString()} บาท</h2>
            <h2 className={styles.expenseTotal}>ยอดรวมรายจ่าย: {expenseTotal.toLocaleString()} บาท</h2>
            <h3 className={styles.header}>รายการที่บันทึก</h3>
            <ul>
                {transactions.length > 0 ? (
                    transactions.map(tx => (
                        <li key={tx.id} className={styles.transactionItem}>
                            {tx.date} - {tx.type} - {tx.amount.toLocaleString()} บาท - {tx.note}
                        </li>
                    ))
                ) : (
                    <li>ยังไม่มีรายการบันทึก</li> // ข้อความเมื่อไม่มีรายการ
                )}
            </ul>
        </div>
    );
};

export default HomePage;
