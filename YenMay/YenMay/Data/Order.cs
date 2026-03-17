using System;
using System.Collections.Generic;

namespace YenMay.Data;

public partial class Order
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int Status { get; set; }

    public decimal TotalAmount { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public string ShippingAddress { get; set; } = null!;

    public string? CustomerEmail { get; set; }

    public string? CustomerName { get; set; }

    public string? CustomerPhone { get; set; }

    public string? Notes { get; set; }

    public string OrderCode { get; set; } = null!;

    public int PaymentMethod { get; set; }

    public decimal ShippingFee { get; set; }

    public int? ShippingRuleId { get; set; }

    public string? ShippingRuleName { get; set; }

    public decimal SubTotal { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual AspNetUser? User { get; set; }
}
