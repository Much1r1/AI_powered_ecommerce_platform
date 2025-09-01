import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import Icon from "../../components/AppIcon";

export default function PaymentMethods() {
  const navigate = useNavigate();

  // Mock state – replace later with API data
  const [methods, setMethods] = useState([
    { id: 1, type: "Visa", last4: "1234", expiry: "12/25" },
    { id: 2, type: "Mastercard", last4: "5678", expiry: "08/26" },
  ]);

  const handleDelete = (id) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAdd = () => {
    // 🚀 Navigate to add-payment form (to implement separately)
    navigate("/add-payment-method");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-2xl bg-card shadow-lg rounded-2xl border border-border p-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Icon
            name="ArrowLeft"
            size={24}
            className="cursor-pointer mr-3"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-xl font-semibold">Payment Methods</h2>
        </div>

        {/* List */}
        {methods.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">
            No payment methods saved yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {methods.map((method) => (
              <li
                key={method.id}
                className="flex items-center justify-between border p-4 rounded-lg bg-muted/40"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="CreditCard" size={20} className="text-primary" />
                  <div>
                    <p className="font-medium">{method.type} •••• {method.last4}</p>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expiry}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(method.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}

        {/* Add button */}
        <Button
          onClick={handleAdd}
          className="w-full mt-6"
          iconName="Plus"
        >
          Add Payment Method
        </Button>
      </div>
    </div>
  );
}
