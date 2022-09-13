package sg.edu.nus.server.configurations;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class CORSConfiguration implements WebMvcConfigurer{
    
    private String path;
    private String origins;

    public CORSConfiguration(String p, String o){
        path = p; // /api/*
        origins = o; // * (host path)
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(path)
            .allowedOrigins(origins);
        WebMvcConfigurer.super.addCorsMappings(registry);
    }
}
