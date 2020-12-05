using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Api.Dtos;
using DatingApp.Api.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]    
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _datingRepo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository datingRepo, IMapper mapper)
        {
            this._datingRepo = datingRepo;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _datingRepo.GetUsers();
            var usersDto = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _datingRepo.GetUser(id);
            var userDto = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto userForUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = await _datingRepo.GetUser(id);

            if (user == null)
                return NotFound($"Could not found user with ID of {id}");
            if (currentUserId != user.Id)
                return Unauthorized();

            _mapper.Map(userForUpdateDto, user);
            if (await _datingRepo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user{id} failed to save!");

        }
    }
}
