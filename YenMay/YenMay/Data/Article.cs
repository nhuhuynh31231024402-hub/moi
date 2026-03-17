using System;
using System.Collections.Generic;

namespace YenMay.Data;

public partial class Article
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Slug { get; set; } = null!;

    public string ShortDescription { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public bool IsPublished { get; set; }

    public string ImageUrl { get; set; } = null!;

    public int? CategoryArticleId { get; set; }

    public virtual CategoryArticle? CategoryArticle { get; set; }
}
