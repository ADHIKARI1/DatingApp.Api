using AutoMapper;
using DatingApp.Api.Dtos;
using DatingApp.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Api.Helpers
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            // configure mapper for map photo url for dto, and age with public methode
            CreateMap<User, UserForListDto>()
                .ForMember( dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(x => x.DateOfBirth.CalculateAge());
                })
                .ReverseMap();

            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(x => x.DateOfBirth.CalculateAge());
                })
                .ReverseMap();

            CreateMap<Photo, PhotosForDetailedDto>().ReverseMap();
            CreateMap<UserForUpdateDto, User>().ReverseMap();

        }
    }
}
