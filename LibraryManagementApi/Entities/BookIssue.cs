using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementApi.Entities
{
    public class BookIssue
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }

        [Required(ErrorMessage = "memberId is Required.")]
        public int memberId { get; set; }
        public Member Member { get; set; }

        [Required(ErrorMessage = "bookId is Required.")]
        public int bookId { get; set; }
        public Book Book { get; set; }

        [Required(ErrorMessage = "date is Required.")]
        [Column(TypeName = "DateTime")]
        public DateTime date { get; set; }

        [Required(ErrorMessage = "duedate is Required.")]
        [Column(TypeName = "DateTime")]
        public DateTime duedate { get; set; }

        [Column(TypeName = "DateTime")]
        public DateTime? returnDate { get; set; }


        [Column(TypeName = "varchar(100)")]
        public string? remark { get; set; }

        public bool isReturn { get; set; }

        public bool isDel { get; set; }

    }
   
}
