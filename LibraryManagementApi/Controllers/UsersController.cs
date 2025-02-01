
using LibraryManagementApi.Dto;
using LibraryManagementApi.Shared;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public UsersController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }



        // GET: api/<UsersController>
        [HttpGet]
        public IActionResult Get()
        {
            var res = _dbContext.users.ToList();
            return new JsonResult(res);
        }

        [HttpPost("UserLogin")]
        public IActionResult UserLogin([FromBody] userDto l)
        {
            var user = _dbContext.users
                .Where(x => x.unm ==l.unm && x.pwd ==l.pwd)
                .FirstOrDefault();

            if (user == null)
            {
                return Unauthorized();
            }
            return new JsonResult(user);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UsersController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
