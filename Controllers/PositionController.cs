using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestAngular.CRUDS;
using TestAngular.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestAngular.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PositionController : Controller
    {
        [HttpGet]
        public ActionResult<Response> GetPositions()
        {
            PositionDao position = new PositionDao();

            return new Response()
            {
                data = position.getPositionList(),
                message = "Ok"
            };
        }
    }
}
