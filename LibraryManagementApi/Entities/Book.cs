using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementApi.Entities
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }

        [Required(ErrorMessage = "nm is Required.")]
        [Column(TypeName = "varchar(30)")]
        public string nm { get; set; }

        [Required(ErrorMessage = "author is Required.")]
        [Column(TypeName = "varchar(30)")]
        public string author { get; set; }

        [Required(ErrorMessage = "publication is Required.")]
        [Column(TypeName = "varchar(30)")]
        public string publication { get; set; }

        [Required(ErrorMessage = "year is Required.")]
        [Column(TypeName = "varchar(10)")]
        public string year { get; set; }

        [Required(ErrorMessage = "category is Required.")]
        [Column(TypeName = "varchar(30)")]
        public string category { get; set; }

        //[Required(ErrorMessage = "stock is Required.")]
        //[Column(TypeName = "varchar(10)")]
        public int stock { get; set; }

       // [Column(TypeName = "varchar(10)")]
        public int availableStock { get; set; }

        public bool isDel { get; set; }
    }
    
}
