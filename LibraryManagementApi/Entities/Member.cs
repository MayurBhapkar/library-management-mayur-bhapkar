using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementApi.Entities
{
    public class Member
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }

        [Required(ErrorMessage = "nm is Required.")]
        [Column(TypeName = "varchar(30)")]
        public string nm { get; set; }

        [Required(ErrorMessage = "address is Required.")]
        [Column(TypeName = "varchar(100)")]
        public string address { get; set; }

        [Required(ErrorMessage = "mobile is Required.")]
        [Column(TypeName = "varchar(10)")]
        public string mobile { get; set; }

        [Required(ErrorMessage = "email is Required.")]
        [Column(TypeName = "varchar(20)")]
        public string email { get; set; }

        [Required(ErrorMessage = "admissionDate is Required.")]
        [Column(TypeName = "DateTime")]
        public DateTime admissionDate { get; set; }
    }

    
}
