using LibraryManagementApi.Dto;
using LibraryManagementApi.Entities;
using LibraryManagementApi.Shared;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public MemberController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        // GET: api/<MemberController>
        [HttpGet]
        public IActionResult Get()
        {
            var res = _dbContext.Members.ToList();
            return new JsonResult(res);
        }

        // GET api/<MemberController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var res = _dbContext.Members.FirstOrDefault(x => x.id == id);
            return new JsonResult(res);
        }

        [HttpGet("list")]
        public async Task<IActionResult> list()
        {
            try
            {
                return new JsonResult(_dbContext.Members.Select(x => new
                {
                    ID = x.id,
                    Name = x.nm,
                }).ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST api/<MemberController>
        [HttpPost]
        public IActionResult Post([FromBody] MemberDto value)
        {
            int Id = _dbContext.Members.Select(p => p.id).DefaultIfEmpty().Max();
            Member member = new Member()
            {
                id = Id + 1,
                nm = value.nm,
                address = value.address,
                mobile = value.mobile,
                email = value.email,
                admissionDate = value.admissionDate,
            };

            _dbContext.Members.Add(member);
            _dbContext.SaveChanges();
            return new JsonResult(new { message = "Record Saved Successfully." });

        }

        // PUT api/<MemberController>/5
        [HttpPost("update/{id}")]
        public IActionResult update(int id, [FromBody] MemberDto value)
        {
            var res = _dbContext.Members.FirstOrDefault(x => x.id == id);

            res.nm = value.nm;
            res.address = value.address;
            res.mobile = value.mobile;
            res.email = value.email;
            res.admissionDate = value.admissionDate;

            _dbContext.Members.Attach(res);
            _dbContext.SaveChanges();
            return new JsonResult(new { message = "Record Updated Successfully." });
        }

        // DELETE api/<MemberController>/5
        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var res = _dbContext.Members.FirstOrDefault(x => x.id == id);
            _dbContext.Members.Remove(res);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
