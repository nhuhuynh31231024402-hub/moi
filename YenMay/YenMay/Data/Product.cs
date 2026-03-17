using System;
using System.Collections.Generic;

namespace YenMay.Data;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public decimal Price { get; set; }

    public string ShortDescriptionHtml { get; set; } = null!;

    public string FullDescriptionHtml { get; set; } = null!;

    public string AdditionalInfoHtml { get; set; } = null!;

    public string Sku { get; set; } = null!;

    public int StockQuantity { get; set; }

    public int CategoryId { get; set; }

    public DateTime CreatedDate { get; set; }

    public string? Slug { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<EditorImage> EditorImages { get; set; } = new List<EditorImage>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    public virtual ICollection<ProductReview> ProductReviews { get; set; } = new List<ProductReview>();
}
