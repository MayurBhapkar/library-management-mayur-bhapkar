using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementApi.Dto
{
    public class MemberDto
    {
        public string nm { get; set; }

        
        public string address { get; set; }

       
        public string mobile { get; set; }

        
        public string email { get; set; }

       
        public DateTime admissionDate { get; set; }
    }
}
