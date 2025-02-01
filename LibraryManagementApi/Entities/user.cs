using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementApi.Entities
{
    public class user
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        [Required(ErrorMessage = "UserName is Required.")]
        [Column(TypeName ="varchar(20)")]
        public string unm { get; set; }


        [Required(ErrorMessage = "Password is Required.")]
        [Column(TypeName = "varchar(20)")]
        public string pwd { get; set; }
    }
}
