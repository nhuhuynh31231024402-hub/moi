using System;
using System.Collections.Generic;

namespace YenMay.Data;

public partial class EditorImage
{
    public int Id { get; set; }

    public string FileName { get; set; } = null!;

    public string OriginalName { get; set; } = null!;

    public string FilePath { get; set; } = null!;

    public long FileSize { get; set; }

    public string ContentType { get; set; } = null!;

    public DateTime UploadedAt { get; set; }

    public int? ProductId { get; set; }

    public virtual Product? Product { get; set; }
}
