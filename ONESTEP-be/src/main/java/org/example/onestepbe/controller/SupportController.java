package org.example.onestepbe.controller;

import lombok.RequiredArgsConstructor;
import org.example.onestepbe.model.Support;
import org.example.onestepbe.service.SupportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/supports")
@RequiredArgsConstructor
public class SupportController {
    private final SupportService supportService;

    @GetMapping
    public Map<String, Object> getSupports(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String region
    ) {
        List<Support> list = supportService.getSupports(category, region);
        return Map.of("data", list, "total", list.size());
    }
}
